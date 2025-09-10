Sandbox Introduction
The Akash Sandbox network is intended for short-term workload testing and for new user experimentation.

The Akash Console sandbox mode allows you to:

Test deployments without using real AKT tokens
Experiment with different configurations safely
Learn Akash deployment processes without financial risk
Validate your deployment manifests before going live on mainnet
NOTE - sandbox workloads that have been running for more than 24 hours may be taken down. Please only use the sandbox for short duration testing.

The Akash Sandbox version matches the current Mainnet version.

Use the following documentation for sandbox use and depending on your preferred deployment tool.

Deployment Options
For GUI Users :

Akash Console for Sandbox - Web-based interface with easy network switching
For CLI Users :

Akash CLI for Sandbox Use - Command-line interface for deployment creation and management
NOTE - Most users prefer the Akash Console for its ease of use. Simply switch the network from Mainnet to Sandbox in the Console settings to get started with testing deployments.

Key Differences from Mainnet
When using sandbox mode, be aware of the following differences:

Tokens: Use test AKT tokens instead of real ones
Performance: May have different performance characteristics than mainnet
Providers: Limited set of test providers available
Data: No persistent data guarantees

Sandbox Introduction
The Akash Sandbox network is intended for short-term workload testing and for new user experimentation.

The Akash Console sandbox mode allows you to:

Test deployments without using real AKT tokens
Experiment with different configurations safely
Learn Akash deployment processes without financial risk
Validate your deployment manifests before going live on mainnet
NOTE - sandbox workloads that have been running for more than 24 hours may be taken down. Please only use the sandbox for short duration testing.

The Akash Sandbox version matches the current Mainnet version.

Use the following documentation for sandbox use and depending on your preferred deployment tool.

Deployment Options
For GUI Users :

Akash Console for Sandbox - Web-based interface with easy network switching
For CLI Users :

Akash CLI for Sandbox Use - Command-line interface for deployment creation and management
NOTE - Most users prefer the Akash Console for its ease of use. Simply switch the network from Mainnet to Sandbox in the Console settings to get started with testing deployments.

Key Differences from Mainnet
When using sandbox mode, be aware of the following differences:

Tokens: Use test AKT tokens instead of real ones
Performance: May have different performance characteristics than mainnet
Providers: Limited set of test providers available
Data: No persistent data guarantees

Install Akash CLI
Select a tab below to view instructions for MacOS, Linux, or compiling from source.

MacOS
Linux
Source
From Source
Installing Akash suite from source:

$ go get -d github.com/akash-network/provider
$ cd $GOPATH/src/github.com/akash-network/provider
$ AKASH_NET="https://raw.githubusercontent.com/akash-network/net/main/mainnet"
$ AKASH_VERSION="$(curl -s https://api.github.com/repos/akash-network/provider/releases/latest | jq -r '.tag_name')"
$ git checkout "v$AKASH_VERSION"
$ make deps-install
$ make install

Akash is developed and tested with golang 1.16+. Building requires a working golang installation, a properly set GOPATH, and $GOPATH/bin present in $PATH.

Once you have the dependencies properly setup, download and build akash using make install

Create an Account
Configure the name of your key. The command below will set the name of your key to myWallet, run the below command and replace myWallet with a name of your choice:

Terminal window
AKASH_KEY_NAME=myWallet

Verify you have the shell variables set up . The below command should return the name you’ve used:

Terminal window
echo $AKASH_KEY_NAME

We now need to point Akash to where the keys are stored for your configuration. To do this we will set the AKASH_KEYRING_BACKEND environmental variable.

Terminal window
AKASH_KEYRING_BACKEND=os

Copy and paste this command into Terminal to create an Akash account:

Terminal window
provider-services keys add $AKASH_KEY_NAME

Read the output and save your mnemonic phrase is a safe place. Let’s set a Shell Variable in Terminal AKASH_ACCOUNT_ADDRESS to save your account address for later.

Terminal window
export AKASH_ACCOUNT_ADDRESS="$(provider-services keys show $AKASH_KEY_NAME -a)"

echo $AKASH_ACCOUNT_ADDRESS

Note that if you close your Terminal window this variable will not be saved.

Fund your Account
Use the Sandbox Faucet to fund your account. Enter the Akash account created in the prior step (I.e. akash1xxxxxxxxx address) as prompted within the faucet.

We will verify that the faucet properly funded the account in an upcoming, later section.

NOTE - account and funds are only valid for sandbox network use.

Sandbox Faucet
Expected Result
The following, example screen will appear if funding from the faucet was successful:

Configure your Network
First configure the base URL ($AKASH_NET) for the Akash Network; copy and paste the command below:

Terminal window
AKASH_NET="https://raw.githubusercontent.com/akash-network/net/main/sandbox"

Version
Next configure the version of the Akash Network AKASH_VERSION; copy and paste the command below:

Terminal window
AKASH_VERSION="$(curl -s https://api.github.com/repos/akash-network/provider/releases/latest | jq -r '.tag_name')"

Chain ID
The akash CLI will recogonize AKASH_CHAIN_ID environment variable when exported to the shell.

Terminal window
export AKASH_CHAIN_ID="$(curl -s "$AKASH_NET/chain-id.txt")"

Network Node
You need to select a node on the network to connect to, using an RPC endpoint. To configure theAKASH_NODE environment variable use this export command:

Terminal window
export AKASH_NODE="$(curl -s "$AKASH_NET/rpc-nodes.txt" | shuf -n 1)"

Confirm your network variables are setup
Your values may differ depending on the network you’re connecting to.

Terminal window
echo $AKASH_NODE $AKASH_CHAIN_ID $AKASH_KEYRING_BACKEND

You should see something similar to:

https://rpc.sandbox-01.aksh.pw:443 sandbox-01 os

Set Additional Environment Variables

Set the below set of environment variables to ensure smooth operations

Variable	Description	Recommended Value
AKASH_GAS	Gas limit to set per-transaction; set to “auto” to calculate sufficient gas automatically	auto
AKASH_GAS_ADJUSTMENT	Adjustment factor to be multiplied against the estimate returned by the tx simulation	1.15
AKASH_GAS_PRICES	Gas prices in decimal format to determine the transaction fee	0.0025uakt
AKASH_SIGN_MODE	Signature mode	amino-json
export AKASH_GAS=auto
export AKASH_GAS_ADJUSTMENT=1.25
export AKASH_GAS_PRICES=0.0025uakt
export AKASH_SIGN_MODE=amino-json

Check your Account Balance
Check your account has sufficient balance by running:

Terminal window
provider-services query bank balances --node $AKASH_NODE $AKASH_ACCOUNT_ADDRESS

You should see a response similar to:

balances:
- amount: "25000000"
  denom: uakt
pagination:
  next_key: null
  total: "0"

Please note the balance indicated is denominated in uAKT (AKT x 10^-6), in the above example, the account has a balance of 25 AKT. We’re now setup to deploy.

Your account must have a minimum balance of 0.5 AKT to create a deployment. This 0.5 AKT funds the escrow account associated with the deployment and is used to pay the provider for their services. It is recommended you have more than this minimum balance to pay for transaction fees. For more information on escrow accounts, see here

Create your Configuration
Create a deployment configuration deploy.yaml to deploy the ovrclk/lunie-light for Lunie Light Node app container using SDL.

Modify your Configuration
You may use the sample deployment file as-is or modify it for your own needs as described in our SDL (Stack Definition Language) documentation. A typical modification would be to reference your own image instead of our demo app image.

EXAMPLE CONFIGURATION:
Terminal window
cat > deploy.yml <<EOF
---
version: "2.0"

services:
  web:
    image: ovrclk/lunie-light
    expose:
      - port: 3000
        as: 80
        to:
          - global: true

profiles:
  compute:
    web:
      resources:
        cpu:
          units: 0.1
        memory:
          size: 512Mi
        storage:
          size: 512Mi
  placement:
    westcoast:
      pricing:
        web:
          denom: uakt
          amount: 1000000

deployment:
  web:
    westcoast:
      profile: web
      count: 1

EOF

Create your Certificate
Akash requires an account to have a valid certificate associated with it to start participating in the deployment process. In this section of the guide, we will create a certificate locally, and then proceed to store this certificate on the Akash blockchain. To do this, ensure you have followed all the steps outlined in this guide up to this point. Additionally, these transactions must be executed from an Akash account in possession of some $AKT tokens.

Once an account has a certificate associated with it, it can begin deploying services on the Akash blockchain. A certificate needs to be created only once per account. After creation, it can be used across any number of deployments for as long as it remains valid.

Generate Cert
Note: If it errors with Error: certificate error: cannot overwrite certificate, then add --overwrite should you want to overwrite the cert. Normally you can ignore that error and proceed with publishing the cert (next step).
provider-services tx cert generate client --from $AKASH_KEY_NAME

Publish Cert to the Blockchain
provider-services tx cert publish client --from $AKASH_KEY_NAME

Create your Deployment
CPU Support
Only x86_64 processors are officially supported for Akash deployments. This may change in the future and when ARM processors are supported it will be announced and documented.

Akash Deployment
To deploy on Akash, run:

provider-services tx deployment create deploy.yml --from $AKASH_KEY_NAME

You should see a response similar to:

{
  "height":"140325",
  "txhash":"2AF4A01B9C3DE12CC4094A95E9D0474875DFE24FD088BB443238AC06E36D98EA",
  "codespace":"",
  "code":0,
  "data":"0A130A116372656174652D6465706C6F796D656E74",
  "raw_log":"[{\"events\":[{\"type\":\"akash.v1\",\"attributes\":[{\"key\":\"module\",\"value\":\"deployment\"},{\"key\":\"action\",\"value\":\"deployment-created\"},{\"key\":\"version\",\"value\":\"2b86f778de8cc9df415490efa162c58e7a0c297fbac9cdb8d6c6600eda56f17e\"},{\"key\":\"owner\",\"value\":\"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj\"},{\"key\":\"dseq\",\"value\":\"140324\"},{\"key\":\"module\",\"value\":\"market\"},{\"key\":\"action\",\"value\":\"order-created\"},{\"key\":\"owner\",\"value\":\"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj\"},{\"key\":\"dseq\",\"value\":\"140324\"},{\"key\":\"gseq\",\"value\":\"1\"},{\"key\":\"oseq\",\"value\":\"1\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"create-deployment\"},{\"key\":\"sender\",\"value\":\"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj\"},{\"key\":\"sender\",\"value\":\"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj\"}]},{\"type\":\"transfer\",\"attributes\":[{\"key\":\"recipient\",\"value\":\"akash17xpfvakm2amg962yls6f84z3kell8c5lazw8j8\"},{\"key\":\"sender\",\"value\":\"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj\"},{\"key\":\"amount\",\"value\":\"5000uakt\"},{\"key\":\"recipient\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"},{\"key\":\"sender\",\"value\":\"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj\"},{\"key\":\"amount\",\"value\":\"5000000uakt\"}]}]}]",
  "logs":[
    {
      "msg_index":0,
      "log":"",
      "events":[
        {
          "type":"akash.v1",
          "attributes":[
            {
              "key":"module",
              "value":"deployment"
            },
            {
              "key":"action",
              "value":"deployment-created"
            },
            {
              "key":"version",
              "value":"2b86f778de8cc9df415490efa162c58e7a0c297fbac9cdb8d6c6600eda56f17e"
            },
            {
              "key":"owner",
              "value":"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj"
            },
            {
              "key":"dseq",
              "value":"140324"
            },
            {
              "key":"module",
              "value":"market"
            },
            {
              "key":"action",
              "value":"order-created"
            },
            {
              "key":"owner",
              "value":"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj"
            },
            {
              "key":"dseq",
              "value":"140324"
            },
            {
              "key":"gseq",
              "value":"1"
            },
            {
              "key":"oseq",
              "value":"1"
            }
          ]
        },
        {
          "type":"message",
          "attributes":[
            {
              "key":"action",
              "value":"create-deployment"
            },
            {
              "key":"sender",
              "value":"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj"
            },
            {
              "key":"sender",
              "value":"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj"
            }
          ]
        },
        {
          "type":"transfer",
          "attributes":[
            {
              "key":"recipient",
              "value":"akash17xpfvakm2amg962yls6f84z3kell8c5lazw8j8"
            },
            {
              "key":"sender",
              "value":"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj"
            },
            {
              "key":"amount",
              "value":"5000uakt"
            },
            {
              "key":"recipient",
              "value":"akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
            },
            {
              "key":"sender",
              "value":"akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj"
            },
            {
              "key":"amount",
              "value":"5000000uakt"
            }
          ]
        }
      ]
    }
  ],
  "info":"",
  "gas_wanted":"100000",
  "gas_used":"94653",
  "tx":null,
  "timestamp":""
}

Find your Deployment #
Find the Deployment Sequence (DSEQ) in the deployment you just created. You will need to replace the AKASH_DSEQ with the number from your deployment to configure a shell variable.

Terminal window
export AKASH_DSEQ=<CHANGETHIS>

Now set the Order Sequence (OSEQ) and Group Sequence (GSEQ). Note that if this is your first time deploying on Akash, OSEQ and GSEQ will be 1.

Terminal window
AKASH_OSEQ=1
AKASH_GSEQ=1

Verify we have the right values populated by running:

Terminal window
echo $AKASH_DSEQ $AKASH_OSEQ $AKASH_GSEQ

View your Bids
After a short time, you should see bids from providers for this deployment with the following command:

Terminal window
provider-services query market bid list --owner=$AKASH_ACCOUNT_ADDRESS --node $AKASH_NODE --dseq $AKASH_DSEQ --state=open

Choose a Provider
Note that there are bids from multiple different providers. In this case, both providers happen to be willing to accept a price of 1 uAKT. This means that the lease can be created using 1 uAKT or 0.000001 AKT per block to execute the container. You should see a response similar to:

bids:
- bid:
    bid_id:
      dseq: "140324"
      gseq: 1
      oseq: 1
      owner: akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj
      provider: akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal
    created_at: "140326"
    price:
      amount: "1"
      denom: uakt
    state: open
  escrow_account:
    balance:
      amount: "50000000"
      denom: uakt
    id:
      scope: bid
      xid: akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj/140324/1/1/akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal
    owner: akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal
    settled_at: "140326"
    state: open
    transferred:
      amount: "0"
      denom: uakt
- bid:
    bid_id:
      dseq: "140324"
      gseq: 1
      oseq: 1
      owner: akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj
      provider: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    created_at: "140326"
    price:
      amount: "1"
      denom: uakt
    state: open
  escrow_account:
    balance:
      amount: "50000000"
      denom: uakt
    id:
      scope: bid
      xid: akash1vn06ycjjnvsvl639fet9lajjctuturrtx7fvuj/140324/1/1/akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    owner: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    settled_at: "140326"
    state: open
    transferred:
      amount: "0"
      denom: uakt

For this example, we will choose akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal Run this command to set the provider shell variable:

AKASH_PROVIDER=akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal

Verify we have the right value populated by running:

echo $AKASH_PROVIDER

Create a Lease
Create a lease for the bid from the chosen provider above by running this command:

provider-services tx market lease create --dseq $AKASH_DSEQ --provider $AKASH_PROVIDER --from $AKASH_KEY_NAME

Confirm the Lease
You can check the status of your lease by running:

provider-services query market lease list --owner $AKASH_ACCOUNT_ADDRESS --node $AKASH_NODE --dseq $AKASH_DSEQ

Note the bids will close automatically after 5 minutes, and you may get the response:

bid not open

If this happens, close your deployment and open a new deployment again. To close your deployment run this command:

provider-services tx deployment close --dseq $AKASH_DSEQ  --owner $AKASH_ACCOUNT_ADDRESS --from $AKASH_KEY_NAME

If your lease was successful you should see a response that ends with:

    state: active

Please note that once the lease is created, the provider will begin debiting your deployment’s escrow account, even if you have not completed the deployment process by uploading the manifest in the following step.

Send the Manifest
Upload the manifest using the values from above step:

provider-services send-manifest deploy.yml --dseq $AKASH_DSEQ --provider $AKASH_PROVIDER --from $AKASH_KEY_NAME

Confirm the URL
Now that the manifest is uploaded, your image is deployed. You can retrieve the access details by running the below:

provider-services lease-status --dseq $AKASH_DSEQ --from $AKASH_KEY_NAME --provider $AKASH_PROVIDER

You should see a response similar to:

{
  "services": {
    "web": {
      "name": "web",
      "available": 1,
      "total": 1,
      "uris": [
        "rga3h05jetf9h3p6dbk62m19ck.ingress.ewr1p0.mainnet.akashian.io"
      ],
      "observed_generation": 1,
      "replicas": 1,
      "updated_replicas": 1,
      "ready_replicas": 1,
      "available_replicas": 1
    }
  },
  "forwarded_ports": {}
}

You can access the application by visiting the hostnames mapped to your deployment. Look for a URL/URI and copy it to your web browser.

View your logs
You can view your application logs to debug issues or watch progress like so:

Terminal window
provider-services lease-logs \
  --dseq "$AKASH_DSEQ" \
  --provider "$AKASH_PROVIDER" \
  --from "$AKASH_KEY_NAME"

Update the Deployment
Update the Manifest
Update the deploy.yml manifest file with the desired change.

NOTE:** Not all attributes of the manifest file are eligible for deployment update. If the hardware specs of the manifest are updated (I.e. CPU count), a re-deployment of the workload is necessary. Other attributes, such as deployment image and funding, are eligible for updates.

Issue Transaction for On Chain Update
provider-services tx deployment update deploy.yml --dseq $AKASH_DSEQ --from $AKASH_KEY_NAME

Send Updated Manifest to Provider
provider-services send-manifest deploy.yml --dseq $AKASH_DSEQ --provider $AKASH_PROVIDER --from $AKASH_KEY_NAME

Close Deployment
Close the Deployment
Should you need to close the deployment follow this step.

provider-services tx deployment close --from $AKASH_KEY_NAME

