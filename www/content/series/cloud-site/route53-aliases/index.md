---
title: Add Route53 aliases for your CloudFront distribution
order: 8
draft: true
---

- Navigate back to Route53
- Click on "Hosted Zones" in the left sidebar

![Arrow pointing to "Hosted Zones" link](./hosted-zones-link.png)

- Click on the link to your domain's hosted zone

![Arrow pointing to hosted zone listing](./hosted-zone-listing.png)

- In the top menu, click the "Create Record Set" button

![Arrow pointing to "Create Record Set" button](./create-record-set.png)

- Leave the "Name" empty and set "Alias" to "Yes"

![Screenshot of record set settings](./record-set-settings.png)

- Click the "Alias Target" input and select your "CloudFront Distribution", then click the "Create" button

![Arrow pointing to the alias target](./alias-target1.png)

- After creating this alias, follow the same steps as above, but set "Name" to "www"

![Arrow pointing to the alias target](./alias-target2.png)

- You should then see an alias for both your domain and www.domain

![Screenshot of domain alias listings](./aliases.png)
