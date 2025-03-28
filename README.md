# Just My Socks Bandwidth Monitor Script for Quantumult X

This script offers a convenient way to monitor your Just My Socks bandwidth usage directly within **Quantumult X**. Whether used as part of a policy group or executed as a standalone script, it provides real-time visibility into your data consumption.

## Features

- Fetches real-time monthly bandwidth quota and usage  
- Displays remaining bandwidth and usage percentage  
- Supports Quantumult X node menu or standalone mode  
- Clean and intuitive display to help you avoid hitting your bandwidth cap  

## Getting Started

### 1. Retrieve Your Just My Socks API URL  
- Log in to your [Just My Socks account](https://justmysocks.net), and locate the **“API – Bandwidth Counter”** section.  
- Copy your unique API URL.

### 2. Configure the Script  
- Replace the placeholder in the script:  
  ```js
  var api_url = "XXXXXX"; // <-- Paste your API URL here
  ```

### 3. Add the Script to Quantumult X  
- Import the edited script into the relevant configuration section of Quantumult X.

### 4. Run the Script  
- Either trigger the script via a policy group or run it manually within Quantumult X.

### 5. View Bandwidth Usage  
- Depending on how the script is run, your usage stats will appear in the Quantumult X log or as a popup HTML notification.

## Security Notice

**Never share your Just My Socks API URL.** It contains sensitive credentials that grant access to your account’s usage data. If you suspect your API URL has been exposed, change your account password immediately to regenerate the token.

## License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).  
Feel free to fork, contribute, and open issues or PRs!
