---
title: Create a CloudFront distribution
order: 7
draft: true
---

- Navigate to CloudFront using the Services pane
- Click the main "CloudFront Distributons" screen, click the "Create Distribution" button

![Arrow pointing to "Create Distribution" button](./create-distribution.png)

- Click the "Get Started" button under the "Web" section

![Arrow pointing to "Get Started" button](./get-started.png)

- Click the "Origin Domain Name" and select the entry corresponding to the domain (domain.com.s3.amazonaws.com) from the "Amazon S3 Buckets" section of the dropdown

![Screenshot of "Origin Domain Name" dropdown](./origin-domain-name.png)

- Change "Restrict Bucket Access" to "Yes"
- Select "Create a New Identity" for "Origin Access Identity", change "Comment" to the domain name (domain.com), and select "Yes, Update Bucket Policy" for "Grant Read Permissions on Bucket"

![Screenshot of "Origin Access Identity" settings](./origin-access-identity.png)

- Viewer Protocol Policy: “Redirect HTTP to HTTPS”

![Screenshot of "Viewer Protocol Policy" settings](./redirect.png)

- Alternate Domain Names: "www.domain.com" and “domain.com”

![Screenshot of "Alternate Domain Names" settings](./alternate-domain-names.png)

- SSL Certificate: “Custom SSL Certificate” and select “domain.com” from the dropdown list. This attaches the certificate we created earlier to this distribution

![Screenshot of "Custom SSL Certificate" settings](./custom-ssl-certificate.png)

- Default Root Object: index.html

![Screenshot of "Default Root Object" settings](./root-object.png)

- click "Create Distribution" and then click "Distributons" in the sidebar to the return to the main "CloudFront Distributions" screen. you should now see the distribution in the list

![Arrow pointing to the created distribution](./enabled-distribution-listing.png)

### Set up the error page

- Click on the distributon ID link

![Arrow pointing to the distribution ID link](./distribution-listing.png)

- Click the "Error Pages" tab

![Arrow pointing to the "Error Pages" tab](./error-pages.png)

- Click the "Create Custom Error Response" button

![Arrow pointing to the "Create Custom Error Response" button](./create-custom-error-response.png)

- HTTP Error Code: “400: Bad Request” with 0 TTL, Customize Error Response to “Yes”, Response Page Path as “/index.html”, and HTTP Response Code as “200: OK” and then click "Create"

![Screenshot of "Customize Error Response" settings](./400-error-response.png)

- Click "Create Custom Error Response" again
- HTTP Error Code: “403: Forbidden” with 0 TTL, Customize Error Response to “Yes”, Response Page Path as “/index.html”, and HTTP Response Code as “200: OK” and then click "Create"

![Screenshot of "Customize Error Response" settings](./403-error-response.png)
