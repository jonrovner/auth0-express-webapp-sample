# Express OpenID Connect Webapp Sample

This is a customized sample application that retrieves a tenants enabled clients and the list of rules applying to each client.

## Running This Sample Locally

1. Install the dependencies with npm:

```bash
npm install
```


2. Create `.env` flie and replace or check the following values. 


- `CLIENT_ID` - your Auth0 application client id
- `ISSUER_BASE_URL` - absolute URL to your Auth0 application domain (ie: `https://accountName.auth0.com`)
- `APP_SESSION_SECRET` - a randomly rengerated string. You can generate one on the command line with the following `openssl rand -hex 32`
- 'API_EXPLORER_CLIENT_ID'
- 'API_EXPLORER_SECRET' credentials may be finded in your Auth0 Management API dashboard.



3. Run the sample app:

```bash
npm start
```

The sample app will be served at `localhost:3000`.


## What is Auth0?

Auth0 helps you to easily:

- implement authentication with multiple identity providers, including social (e.g., Google, Facebook, Microsoft, LinkedIn, GitHub, Twitter, etc), or enterprise (e.g., Windows Azure AD, Google Apps, Active Directory, ADFS, SAML, etc.)
- log in users with username/password databases, passwordless, or multi-factor authentication
- link multiple user accounts together
- generate signed JSON Web Tokens to authorize your API calls and flow the user identity securely
- access demographics and analytics detailing how, when, and where users are logging in
- enrich user profiles from other data sources using customizable JavaScript rules

[Why Auth0?](https://auth0.com/why-auth0)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
