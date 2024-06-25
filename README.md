# Airtable Webhook Integration

This project provides a webhook receiver built with Express.js and TypeScript to handle Clock In and Clock Out events, and integrates with Airtable to create and update records based on these events.

## Table of Contents

- [Airtable Webhook Integration](#airtable-webhook-integration)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [Testing](#testing)

## Project Description

This project handles webhook events for Clock In and Clock Out, processes the data, and interacts with Airtable to manage records. It uses Express.js for the server, TypeScript for type safety, and Jest for testing. The project also includes utility functions to create, update, and find records in Airtable.

## Setup Instructions

### Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/airtable-webhook-integration.git
cd airtable-webhook-integration
```

2. Install the dependencies:
```sh
npm install
```

### Environment Variables

Create `.env.development` and `.env.production` files in the root of your project and set the following environment variables:

```plaintext
PORT=3000
URL=localhost
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=your_airtable_table_name
```

## Usage

1. Start the server:
```sh
npm run start
```

2. The server will start and listen for webhook events at `http://localhost:3000/webhook`.

## Testing

This project uses Jest for testing. To run the tests, use the following command:
```sh
npm test
```

The test suite includes tests for the Airtable service functions and the webhook handler.