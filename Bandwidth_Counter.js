var api_url = "XXXXXX"; // API URL
var opts = { method: "GET" };

// Try to get policy (node) information
var policyName = $environment.params || "DefaultPolicy";
var isPolicyRun = policyName !== "DefaultPolicy"; // Determine if script is run from node menu

// Define request parameters
var myRequest = {
    url: api_url,
    opts: isPolicyRun ? { ...opts, policy: policyName } : opts,
    timeout: 4000 // Set request timeout to 4000ms
};

// Execute the request
$task.fetch(myRequest).then(response => {
    // Parse the response body as JSON
    var data = JSON.parse(response.body);
    var monthly_bw_limit = data['monthly_bw_limit_b'];
    var bw_used = data['bw_counter_b'];

    // Force decimal unit calculation (GB)
    var monthly_bw_limit_gb = monthly_bw_limit / 1000000000;
    var bw_used_gb = bw_used / 1000000000;

    // Choose logic based on execution context
    if (isPolicyRun) {
        // Logic when triggered from node menu
        handlePolicyRun(policyName, monthly_bw_limit_gb, bw_used_gb);
    } else {
        // Logic when run as a standalone script
        handleStandaloneRun(monthly_bw_limit_gb, bw_used_gb);
    }
}, reason => {
    console.log("Failed to retrieve data");
    $done({});
});

// Handle execution from node menu
function handlePolicyRun(policyName, monthly_bw_limit_gb, bw_used_gb) {
    var percentage = (bw_used_gb / monthly_bw_limit_gb) * 100;
    var bw_remaining_gb = monthly_bw_limit_gb - bw_used_gb;

    var message = `Node: ${policyName}\n\n`;
    message += `Monthly Limit: ${monthly_bw_limit_gb.toFixed(3)} GB\n\n`;
    message += `Used: ${bw_used_gb.toFixed(3)} GB\n\n`;
    message += `Remaining: ${bw_remaining_gb.toFixed(3)} GB\n\n`;
    message += `Usage: ${percentage.toFixed(2)}%`;

    var htmlMessage = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold">` + message.replace(/\n/g, '</br>') + `</p>`;

    $done({ "title": "Bandwidth Usage", "htmlMessage": htmlMessage });
}

// Handle standalone script execution
function handleStandaloneRun(monthly_bw_limit_gb, bw_used_gb) {
    var percentage = (bw_used_gb / monthly_bw_limit_gb) * 100;
    var bar_length = 37;
    var filled_length = Math.round(bar_length * percentage / 100);
    var bar = '▓'.repeat(filled_length) + '░'.repeat(bar_length - filled_length);

    var message = `Billing Information\n\n`;
    message += `${bar} ${percentage.toFixed(2)}%\n\n`;
    message += `Monthly data transfer: ${bw_used_gb.toFixed(3)} GB used out of ${monthly_bw_limit_gb.toFixed(0)} GB\n\n`;

    console.log(message);
    $done({});
}
