<br/>
<div align="center">
<img src="/images/balls.png" alt="Logo" width="80" height="80" style="border-radius: 8px;">
</a>
<h3 align="center">Balls🥚🥚🍆</h3>
<p align="center">
An URL Shortening service with custom domain.


  


</p>
</div>

## Getting Started

To get the project running locally on your machine, follow these steps below.
### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- pnpm *(optional)*
  ```sh
  npm install -g pnpm
  ```
- MySQL 8
### Installation


1. Clone the repository
   ```sh
   $ git clone https://github.com/QuanTrieuPCYT/balls.git
   ```
2. In the root directory of the project, install dependencies
   ```sh
   $ pnpm install
   ```
3. Copy .env.example file
   ```sh
   $ cp .env.example .env
   ```
4. Edit .env file
- `DATABASE_URL`: Your MySQL database URL, URL should be percent-encoded (Ex: `mysql://username:password@host:3306/database`)
- `NEXTAUTH_SECRET`: Passphrase for Next-Auth secret
- `NEXTAUTH_URL`: Production URL
4. Generate Prisma client and seed the database
   ```sh
   $ npm run prepare
   ```
5. Build the project
   ```sh
   $ npm run build
   ```
6. Start the project
   ```sh
   $ npm start
   ```
### Reverse proxy
To be updated
### Built With

- [Next.js](https://nextjs.org)
- [Express.js](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
 ## Contributing

We welcome anyone who wants to contribute to the project. To contribute, follow these simple steps:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
 ## License

Distributed under the MIT License. See [MIT License](https://opensource.org/licenses/MIT) for more information.
