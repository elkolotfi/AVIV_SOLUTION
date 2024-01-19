# AVIV technical test solution

You can use this file to write down your assumptions and list the missing features or technical revamp that should
be achieved with your implementation.
start at 7:34
## Notes

Write here notes about your implementation choices and assumptions.

- I chosed to separate business layer from data layer
- I used singleton design pattern
- I decided to have only one open connexion per service (I'm aware it's opened and never closed in a clean way). I prefer that over having a new connexion
  on every function call. An optimal solution would be to have a managed connexion pool


## Questions

This section contains additional questions your expected to answer before the debrief interview.

- **What is missing with your implementation to go to production?**
  - In order to be prod ready, we need first to handle user inputs (we can do that using middy validator)
  - We should make insert and update functions transactional (otherwise, if insert or update finish successfully and insert of price history fails, we end up with corrupted prices history)
  - We need to add more unit tests (and integration tests)
  - Currently the api is public, so anyone would be able to insert and update listings. Thus, we should manage authentication and authorisation
  - Add some logging (using some tool like winston)

- **How would you deploy your implementation?**
  - In order to deploy our implementation we need to add a new role and attach the needed policy to it.
  - Add the new role to our serverless.ts config, and add all neeeded configs to the aws provider (region...)
  - make sure AWS CLI is installed and configured on our local machine
  - deploy using `serverless deploy`

- **If you had to implement the same application from scratch, what would you do differently?**
  - Manage connexions pool to database
  - Use some dependency injection library (like TypeDI) in order to avoid managing object instances manually
  - Use some ORM library (like TypeORM) in order to avoid having sql queries inside my code and stay on OO
  - Also this would help us manage transactionnal aspect of insert and update listings

- **The application aims at storing hundreds of thousands listings and millions of prices, and be accessed by millions
  of users every month. What should be anticipated and done to handle it?**
  - We could start with having a primary database for READ and WRITE operations, then have multiple read replicas for READ operations (RDS can help us achieve this)
  - Since prices table would have many more data in it, we could consider vertical sharding based on listing_id
  - Enable caching on api gateway and functions
  - Use Redis Elastic cache to return most fetched listings (remove those listing from cache on update)

  NB: You must update the [given architecture schema](./schemas/Aviv_Technical_Test_Architecture.drawio) by importing it
  on [diagrams.net](https://app.diagrams.net/) 
