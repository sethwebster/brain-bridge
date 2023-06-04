#!/bin/bash

# Function to add date and time to echo statements
# Parameters:
# $1 - message to log
# $2 - indentation string (optional)
function log {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $2$1"
}

# Function to convert a Word document to Markdown
# Parameters:
# $1 - path to the input Word document
# $2 - path to the output Markdown file
function convert_docx_to_md {
    pandoc -f docx -t markdown "$1" -o "$2"
}

# Function to convert a Powerpoint presentation to Markdown
# Parameters:
# $1 - path to the input Powerpoint presentation
# $2 - path to the output Markdown file
function convert_pptx_to_md {
    pptx2md "$1" -o "$2"
}

# Function to convert an Excel spreadsheet to Markdown
# Parameters:
# $1 - path to the input Excel spreadsheet
# $2 - path to the output Markdown file
function convert_xlsx_to_md {
    python3 /convert_xls_to_md.py "$1" "$2"
}

# Function to convert a PDF file to Markdown
# Parameters:
# $1 - path to the input PDF file
# $2 - path to the output Markdown file
function convert_pdf_to_md {
    pdftotext -layout "$1" "${1%.*}.txt"
    pandoc "${1%.*}.txt" -f markdown -t markdown -s -o "$2"
    rm "${1%.*}.txt"
}

# Function to process a single file
# Parameters:
# $1 - path to the input file
# $2 - depth of the current folder (used for indentation)
function process_file {
    # Convert file extension to lowercase
    file_ext="${1##*.}"
    file_ext="${file_ext,,}"

    # Extract only the filename (without the directory path)
    filename="$(basename "$1")"

    # Construct the output file path
    output_file="/docs/md-output/${filename%.*}.md"

    # Create indent string based on depth of child directory
    indent=$(printf "%${2}s" "")
    log "Processing $1" "$indent"

    # Check if the file is a Word, Powerpoint, Excel, or PDF file
    if [[ $file_ext == docx ]]; then 
        convert_docx_to_md "$1" "$output_file"
    elif [[ $file_ext == pptx ]]; then 
        convert_pptx_to_md "$1" "$output_file"
    elif [[ $file_ext == xlsx || $file_ext == xlsm ]]; then 
        convert_xlsx_to_md "$1" "$output_file"
    elif [[ $file_ext == pdf ]]; then 
        convert_pdf_to_md "$1" "$output_file"
    fi 
}

# Function to process all files in a directory
# Parameters:
# $1 - path to the original directory being processed
# $2 - path to the current directory being processed
# $3 - optional flag indicating whether to process child directories recursively ("-r")
function process_directory {
    original_path="$1"
    current_path="$2"
    depth=$(tr -cd '/' <<<"$current_path" | wc -c)
    depth=$((depth-$(tr -cd '/' <<<"$original_path" | wc -c)))
    indent=$(printf "%*s" $((depth*2)) "")
    log "Processing directory $current_path" "$indent"

    # Check if the directory is the md-output directory
    if [ "$current_path" == "/docs/md-output" ]; then
        log "Skipping md-output directory" "$indent"
        return
    fi

    # Check if the recursive flag was passed as a parameter
    if [ "$3" == "-r" ]; then
        log "Recursively processing child folders" "$indent"
        # Loop through all subdirectories recursively
        find "$current_path" -type d | while read dir; do
            process_directory "$original_path" "$dir" "$3"
        done
        # Loop through all files in the current directory
        for file in "$current_path"/*; do
            process_file "$file" "$depth"
        done
    else
        # Loop through all files in the folder
        for file in "$current_path"/*; do
            process_file "$file" "$depth"
        done
    fi
}


# Check if a folder path was passed as a parameter
if [ -z "$1" ]; then 
    echo "Please provide a folder path as the first parameter" 
    exit 1 
fi

# Create md-output directory if it doesn't exist
if [ ! -d "/docs/md-output" ]; then
  mkdir /docs/md-output
fi

# Process the specified directory
process_directory "$1" "$1" "$2"

echo "Conversion complete"