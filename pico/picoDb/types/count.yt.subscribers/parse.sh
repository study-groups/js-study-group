count.yt.subscribers () {
    awk '{
        id = $1;                      # Timestamp
        type = substr($2, 1, 1);      # Extract first char of the second field
        data = "";                    # Initialize data string
        for (i = 3; i <= NF; i++) {   # Loop from the third field to the last
            data = data $i " ";       # Append each field to data with space
            if ($i ~ /.* $/) {        #  if field ends a space 
                break;
            }
        }
        printf "local id: %s type: %s data: %s\n", id, type, data;  # Print formatted output
    }' -
}
count.yt.subscribers
