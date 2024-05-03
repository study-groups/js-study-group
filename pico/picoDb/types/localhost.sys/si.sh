parse_sys_info() {
    local sysinfo="$1"

    # Processes
    local processes=$(echo "$sysinfo" | awk '/Processes:/ {print $2}')
    local running=$(echo "$sysinfo" | awk '/Processes:/ {print $4}' | tr -d ',')
    local stuck=$(echo "$sysinfo" | awk '/Processes:/ {print $6}' | tr -d ',')  # Adjust field index
    local sleeping=$(echo "$sysinfo" | awk '/Processes:/ {print $10}' | tr -d ',')
    local threads=$(echo "$sysinfo" | awk '/Processes:/ {print $13}')

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
    local physmem_unused=$(echo "$sysinfo" | awk '/PhysMem:/ {print $8}' | tr -d 'M unused.')  # Correct extraction of unused memory

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
    echo "Physical Memory Unused: $physmem_unused M"
}

# Example usage
i="Processes: 416 total, 3 running, 2 stuck, 411 sleeping, 2464 threads 
2024/04/19 05:42:29
Load Avg: 1.87, 1.70, 1.59 
CPU usage: 5.60% user, 12.9% sys, 82.30% idle 
SharedLibs: 340M resident, 80M data, 19M linkedit.
MemRegions: 510975 total, 1774M resident, 69M private, 592M shared.
PhysMem: 7588M used (1507M wired, 3191M compressor), 41M unused.
VM: 195T vsize, 4892M framework vsize, 254872211(0) swapins, 259429264(0) swapouts."
parse_sys_info "$i"
