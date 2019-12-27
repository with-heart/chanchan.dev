---
title: Point your Namecheap domain to Route53 nameservers
order: 4
draft: true
---

- From the namecheap main page, sign in using the Sign In drop-down in the top left

![Screenshot of Namecheap sign in dropdown](./sign-in.png)

- From your Dashboard, find your domain and click "Manage"

![Arrow pointing to "Manage" button](./manage.png)

- From the domain dashboard, find the "Nameservers" section. It will set to "Namecheap BasicDNS" by default. Change that to "Custom DNS" and text fields will appear
- Add each nameserver listed in your domain's Hosted Zone NS entry in Route 53. You can use the "Add Nameserver" button to add additional entries. Then press the green checkmark to save

![Arrow pointing to green checkmark](./check.png)

![Arrow pointing to Route53 nameservers](./nameservers.png)

- As the success alert notes when you save, dns changes can take up to 48 hours to propagate
