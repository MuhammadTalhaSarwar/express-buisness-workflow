# Business Workflow API

This assignment, provided by GLOW, presents a solution for progressing a business through various workflow stages. The workflow stages are:

- New: A new business has been created in the system.
- Market Approved: The business industry is within the target market.
- Market Declined: The business industry is not within the target market.
- Sales Approved: The business is now part of the sales process.
- Won: The business deal was won.
- Lost: The business was not closed.

## Business Data Model

| Property     | Type   | Description                                               |
|--------------|--------|-----------------------------------------------------------|
| fein         | String | Federal Employer ID Number (9 Digits).                    |
| name         | String | The business' name.                                       |
| industry     | Enum   | The industry the business is in. Values are: `restaurants`, `stores`, `wholesale`, `services`. |
| contact      | Object | An object representing a contact for this business.       |
| contact.name | String | The name of the contact.                                  |
| contact.phone| String | The phone number for this contact.                        |

## Workflow Rules

1. Every business created starts the workflow as "New".
2. From "New", the industry is required to progress in the workflow.
   - Only `restaurants` and `stores` are supported. Others are Market Declined.
3. From Market Approved, a contact is needed to progress. A valid contact will be Sales Approved.
4. From Sales Approved, a business can be Won or Lost. No data is required for this step.
5. Businesses can only progress one step at a time through the workflow.
6. With each API response, information on what is required for the next step is provided.


## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/MuhammadTalhaSarwar/express-buisness-workflow.git
    cd express-buisness-workflow
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Build the project:
    ```bash
    npm run build
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Run the tests:
    ```bash
    npm test
    ```

## Running Tests

The project uses Jest for testing. To run the tests, use the following command:

```bash
npm test
```
