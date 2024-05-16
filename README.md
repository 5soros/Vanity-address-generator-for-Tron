# Vanity-address-generator-for-Tron
# Tron 连号地址生成和筛选
 
 
 for run-v2-GPU.js
 use GPU to be fastly

Step 1: Install Visual Studio
Download Visual Studio Community Edition:

Go to the Visual Studio downloads page.
Download the Visual Studio installer.
Install Visual Studio:

Run the installer and select "Desktop development with C++" workload.
Ensure you include all necessary components for building native modules.

Step 2: Configure Node.js to Use Python and Visual Studio
Ensure that you have Python installed and properly configured. Node-gyp needs Python to be set up correctly.

Install Python (if not already installed):

Download Python from the official website.
Make sure to add Python to your PATH during installation.
Configure npm to use the correct Python and Visual Studio versions:

Open a command prompt or PowerShell window and run the following commands:

npm config set python python3.11  # or your installed Python version
npm config set msvs_version 2022  # if you installed Visual Studio 2022
Step 3: Clean npm Cache and Reinstall Dependencies
Sometimes, cleaning the npm cache and reinstalling dependencies can help resolve installation issues.

Clean npm cache:


npm cache clean --force

Reinstall dependencies:

npm install
Optional Step: Use Windows-Build-Tools
If the above steps don't resolve the issue, you can try installing windows-build-tools which simplifies the setup process for Windows development.

Install windows-build-tools:

npm install --global --production windows-build-tools


