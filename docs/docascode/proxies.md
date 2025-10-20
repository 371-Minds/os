Grab a Free Proxy List for Your Next Project
Sometimes you need to proxy your HTTP requests. Maybe you're testing how your app behaves in different regions, scraping public data without getting blocked, or just need to add an extra layer of obfuscation to your outbound traffic. Manually finding and verifying reliable, free proxies is a tedious chore that most developers would gladly offload.

That's where this free proxy list comes in. It's a simple, no-nonsense resource that saves you the hassle of scouring the web yourself.

What It Does
In short, this GitHub repository provides a regularly updated list of free proxy servers. The list includes proxies supporting various protocols: HTTP, SOCKS4, and SOCKS5. The data is available in easy-to-parse formats like a text file and JSON, making it dead simple to integrate into your scripts and applications.

Why It's Cool
While there are other proxy lists out there, this one stands out for a few practical reasons:

It's Programmer-Friendly: The list is available as a raw text file and a structured JSON file. This means you can easily
curl
the list or parse it directly in your code without any HTML scraping nonsense.
Multiple Protocols: You're not limited to just HTTP. Having SOCKS4 and SOCKS5 support opens up more possibilities for different kinds of network tasks.
Automated Updates: The repository uses GitHub Actions to automatically check and update the proxy list. This means the list is maintained without constant manual intervention, aiming to keep it fresh and relevant.
It's Just Data: The project is focused on providing the raw proxy data. It doesn't force a specific API or library on you, giving you the freedom to use it however you see fit in your own projects.
How to Try It
You don't need to install anything to get started. The quickest way to see the list is to just grab it from the repo.

Head over to the free-proxy-list GitHub repository. In the
data
directory, you'll find the lists in various formats. You can directly use the raw links in your code.

For example, to quickly fetch the list of HTTP proxies from your terminal:

curl https://raw.githubusercontent.com/proxifly/free-proxy-list/main/data/http.txt
Or, you can clone the repo to have a local copy:

git clone https://github.com/proxifly/free-proxy-list.git
Final Thoughts
This is a handy, straightforward resource for developers who occasionally need a free proxy. It's perfect for scripting, testing, and light-duty tasks. Just remember the golden rule of free proxies: they can be unreliable, slow, or go offline without notice. They're great for development and experimentation, but you'll likely want a paid, more robust solution for mission-critical production workloads.
