parse_sys_info() {
    local sysinfo="$1"

    # Processes
    local processes=$(echo "$sysinfo" | awk '/Processes:/ {print $2}')
    local running=$(echo "$sysinfo" | awk '/Processes:/ {print $5}')
    local stuck=$(echo "$sysinfo" | awk '/Processes:/ {print $8}')
    local sleeping=$(echo "$sysinfo" | awk '/Processes:/ {print $11}')
    local threads=$(echo "$sysinfo" | awk '/Processes:/ {print $14}')

    # Load Averages
    local load1=$(echo "$sysinfo" | awk '/Load Avg:/ {print $3}' | tr -d ',')
    local load5=$(echo "$sysinfo" | awk '/Load Avg:/ {print $4}' | tr -d ',')
    local load15=$(echo "$sysinfo" | awk '/Load Avg:/ {print $5}')

    # CPU Usage
    local cpu_user=$(echo "$sysinfo" | awk '/CPU usage:/ {print $3}' | tr -d '% user,')
    local cpu_sys=$(echo "$sysinfo" | awk '/CPU usage:/ {print $5}' | tr -d '% sys,')
    local cpu_idle=$(echo "$sysinfo" | awk '/CPU usage:/ {print $7}' | tr -d '% idle')

    # Physical Memory
    local physmem_used=$(echo "$sysinfo" | awk '/PhysMem:/ {print $2}')
    local physmem_unused=$(echo "$sysinfo" | awk '/PhysMem:/ {print $9}')

    # Network Traffic
    local network_in=$(echo "$sysinfo" | awk '/Networks:/ {print $5}' | tr -d ' in,')
    local network_out=$(echo "$sysinfo" | awk '/Networks:/ {print $9}' | tr -d ' out.')

    # Output the variables
    echo "Processes Total: $processes"
    echo "Processes Running: $running"
    echo "Processes Stuck: $stuck"
    echo "Processes Sleeping: $sleeping"
    echo "Threads: $threads"
    echo "Load Average 1min: $load1"
    echo "Load Average 5min: $load5"
    echo "Load Average 15min: $load15"
    echo "CPU Usage User: $cpu_user%"
    echo "CPU Usage System: $cpu_sys%"
    echo "CPU Usage Idle: $cpu_idle%"
    echo "Physical Memory Used: $physmem_used"
    echo "Physical Memory Unused: $physmem_unused"
    echo "Network In: $network_in"
    echo "Network Out: $network_out"
}
