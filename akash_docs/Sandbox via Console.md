Sandbox via Console
Using Sandbox Network via Akash Console
The Akash Console provides an intuitive web interface for deploying and managing workloads on the Akash Network. For testing and experimentation, you can easily switch from the mainnet to the sandbox network directly through the Console interface.

NOTE - Sandbox network is only accessible via wallet payments. So make sure you are using the wallet as payment method and connected to the console.

Switching to Sandbox Network
This section provides detailed instructions for enabling sandbox mode in the Akash Console.

Access Akash Console
Navigate to the Akash Console web app homepage:

https://console.akash.network/
Open Network Settings
Locate the settings button at the bottom left of the console homepage
Click on App Settings from the menu if you don’t see the settings button, ensure you are logged in and connected to your wallet. Go to Troubleshooting below for help.Akash Console Homepage
Navigate to Network Settings
After clicking on App Settings, you will be directed to the network configuration page.

Change Network to Sandbox
On the network configuration page, locate the pencil button in the network settings section.
Network Settings

Click on the button (currently set to Mainnet)

Select Sandbox from the available options and Click Save

The change will be applied automaticallyChange Network

All deployments will now use sandbox resources and test tokens

Getting Sandbox Tokens
Before deploying on the sandbox environment, you’ll need test tokens:

Visit the Sandbox Faucet
Enter your Akash wallet address
Request test tokens for deployment
Switching Back to Mainnet
To return to the mainnet environment:

Follow steps 1-3 from the switching process above
In the Settings section, change the network back to Mainnet
Verify you’re connected to mainnet before creating production deployments
Troubleshooting
Cannot Access Network Settings
Ensure you’re on the correct Akash Console page.
Ensure you have connected your wallet.
Ensure you select payment method as Wallet - if not, hover over the credits/funds button on the top right Navigation bar and select switch to wallet payments.
Try refreshing the browser.
Clear browser cache if issues persist.
Sandbox Network Not Available
Verify sandbox network is currently operational
Check Validators Announcement channel on Akash Discord for maintenance updates
Deployment Failures
Ensure you have sufficient test tokens from the faucet
Verify your SDL configuration is valid
Check that sandbox providers are available
Not Getting Bids for Deployments
Verify your deployment configuration/SDL is correct
Check that you have sufficient test tokens
Ensure sandbox providers are available and not overloaded
Related Documentation
Sandbox Introduction - Overview of sandbox network
Akash CLI for Sandbox - Command-line sandbox usage
Akash Console - Complete Console documentation
Akash Wallet - Wallet setup and usage
Stack Definition Language (SDL) - Deployment configuration reference