# Evaluation-2

Time: 2 hours

Create 3 APIs

Requirements:

1. Create a POST API with the name `/api/save` which takes the request body as
    ```sh
    {
        urlLink: "https://store-0001.s3.amazonaws.com/input.csv"
    }
    ```

    The request body takes a field called `urlLink`. This contains a CSV with details about company_id and company_sector.
    Sample contents of the above CSV are:

    ```csv
    company_id,company_sector
    95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile
    46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc,Software
    728ae3b7-89dd-41eb-9608-4fc20c839d4c,Automobile
    8727cc61-8c4b-4285-8853-2db808392c04,Software
    e90a7bc7-47fa-49af-bfa1-391fe7768b56,Software
    ```

    Your API should be able to read from such a CSV and call these external APIs to extract the data for companies and their sectors.

    External APIs

    a. Get company by ID

    ```sh
    http://54.167.46.10/company/{id}
    ```
    example: curl "http://54.167.46.10/company/95b5a067-808a-44a9-a490-b4ef8a045f61"
    
    Sample Output:
    ```json
    {
        "id": "95b5a067-808a-44a9-a490-b4ef8a045f61",
        "name": "Volkswagen",
        "tags": ["Cars", "EV"],
        "ceo": "",
        "numberEmployees": 15000
    }
    ```

    b. Get companies for a given sector
    ```sh
    http://54.167.46.10/sector?name={sectorName}
    ```
    example: curl "http://54.167.46.10/sector?name=Software"

    Sample Output:
    ```json
    [{
        "companyId": "8888888888-888888-009900-999999999",
        "performanceIndex": [{
            "key": "cpi",
            "value": 0.2
        }, {
            "key": "cf",
            "value": 30000
        },{
            "key": "mau",
            "value": 0.1
        },{
            "key": "roic",
            "value": 20
        }],
    },
    {
    "companyId": "9999999999-999998-009900-999999999",
        "performanceIndex": [{
            "key": "cpi",
            "value": 0.2
        }, {
            "key": "cf",
            "value": 50000
        },{
            "key": "mau",
            "value": 0.1
        },{
            "key": "roic",
            "value": 20
        }],
    }]
    ```

    - Collate the company data such as company ID, company name, ceo name, address, the company score etc and save these details to your database
    - Create a proper database schema such that you can save all the company details, the compnay address and the company score
    - If there are any failures while saving, throw proper errors

    A company's score is calculated by 

    ```sh
    score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4
    ```

    Output HTTP Status should be correct for newly created data

    Expected Output format (Sample)

    ```json
    [{
        "id": "ad36a7f5-7630-496e-8628-e70981179668",
        "name": "Company ABC",
        "score": 67.45,
    }, {
    "id": "f6827fd2-656b-4264-b0cf-f449ab7a131d",
        "name": "Company DEF",
        "score": 52.45,
    }]
    ```

2. GET API using query params which takes sector name as input
and returns the top ranked companies by score
The second api is calling the database only.

    GET /api/companies?sector=

    e.g. /api/companies?sector=Software

    Expected output format (Sample)

    ```json
    [{
    "id": "ad36a7f5-7630-496e-8628-e70981179668",
        "name": "Company ABC",
        "ceo": "Some person name",
        "score": 67.45,
        "ranking": 1
    },{
    "id": "ad36a7f5-7630-496e-8628-e70981179668",
        "name": "Company DEF",
        "ceo": "Some person name",
        "score": 62.45,
        "ranking": 2
    }]
    ```

3. Update API to update company ceo name or address. Name the API as per standard REST API conventions and methods. Decide what should be the correct output for the API.

Tech Stack:
Express, postgres, sequelize 

Priority:

1 > 2 > 3
The first API is a must have, should be working and well tested.
Once done with 1, then proceed with 2 or 3.

Expectations:
1. Highest code quality
2. Proper test cases
3. Good file naming and structuring
4. Good function and variable naming
5. Error handling in controllers as well as services
6. 100% unit test code coverage
