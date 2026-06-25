# Mojuri Backend

Next.js API server for the Mojuri Jewelry project.

## Run

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`.

## Main API

- `GET /api/products`
- `POST /api/products`
- `GET /api/products/:id`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/orders`
- `POST /api/orders`
- `PUT /api/orders/:id`
- `GET /api/blogs`
- `POST /api/blogs`
- `GET /api/contacts`
- `POST /api/contacts`
- `POST /api/auth/login`

This first version uses in-memory data. The route structure is ready to replace with MongoDB/Mongoose or Prisma later.
