var api_url = "XXXXXX"; // API URL
var opts = { method: "GET" };

// 尝试获取节点信息
var policyName = $environment.params || "默认策略组";
var isPolicyRun = policyName !== "默认策略组"; // 是否从节点菜单运行

// 定义请求参数
var myRequest = {
    url: api_url,
    opts: isPolicyRun ? { ...opts, policy: policyName } : opts,
    timeout: 4000 // 设置超时时间为4000毫秒
};

// 执行请求
$task.fetch(myRequest).then(response => {
    // 解析响应体作为JSON
    var data = JSON.parse(response.body);
    var monthly_bw_limit = data['monthly_bw_limit_b'];
    var bw_used = data['bw_counter_b'];

    // 强制使用十进制单位制进行计算
    var monthly_bw_limit_gb = monthly_bw_limit / 1000000000;
    var bw_used_gb = bw_used / 1000000000;

    // 根据运行环境选择合适的处理逻辑
    if (isPolicyRun) {
        // 处理节点菜单运行的逻辑
        handlePolicyRun(policyName, monthly_bw_limit_gb, bw_used_gb);
    } else {
        // 处理单独运行的逻辑
        handleStandaloneRun(monthly_bw_limit_gb, bw_used_gb);
    }
}, reason => {
    console.log("Failed to retrieve data");
    $done({});
});

// 处理节点菜单运行的逻辑
function handlePolicyRun(policyName, monthly_bw_limit_gb, bw_used_gb) {
    var percentage = (bw_used_gb / monthly_bw_limit_gb) * 100;
    var bw_remaining_gb = monthly_bw_limit_gb - bw_used_gb;

    var message = `节点名称: ${policyName}\n\n`;
    message += `流量限额: ${monthly_bw_limit_gb.toFixed(3)} GB/月\n\n`;
    message += `已用流量: ${bw_used_gb.toFixed(3)} GB/月\n\n`;
    message += `剩余流量: ${bw_remaining_gb.toFixed(3)} GB/月\n\n`;
    message += `使用比例: ${percentage.toFixed(2)}%`;

    var htmlMessage = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold">` + message.replace(/\n/g, '</br>') + `</p>`;

    $done({ "title": "流量使用情况", "htmlMessage": htmlMessage });
}

// 处理单独运行的逻辑
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
