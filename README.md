# HRnet React Application

HRnet is a React-based employee management system that allows you to create, view, and manage employee records efficiently.

## Prerequisites

- Node.js (version v22.8.0 or higher)
- npm (usually comes with Node.js)


## Features

- Create new employee records with detailed information
- View and search existing employee records in a sortable table
- Edit existing employee information
- Delete existing employee information
- Responsive design for various screen sizes
- State management using Redux
- Form validation to ensure data integrity
- Modal confirmation for successful form submissions
- Date picking functionality for birth dates and start dates

## New Features

- Redux integration for state management
- React Router for navigation between pages
- Edit functionality for existing employee records
- Persistent storage using localStorage

## Installation

1. Clone the repository:

https://github.com/FanLubLou/OCR14_HRnet_ReactVersion

2. Navigate to the project directory:

cd OCR14_HRnet_ReactVersion

3. Install dependencies:

npm install


## Usage

To start the development server:

npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Testing

We have implemented unit tests for our components using Jest and React Testing Library. To run the tests:

npm test

### Test Coverage

- `App.test.js`: Ensures the main App component renders without crashing
- `ComponentEmployeeForm.test.js`: Tests the employee form component, including:
  - Rendering of form fields (First Name, Last Name, Street, City, State, Zip Code, Department)
  - Presence of the submit button (Add Employee)
- `ComponentEmployeeList.test.js`: Tests the employee list component, including:
  - Rendering of the employee list with mock data
  - Presence of key elements such as entries section, search input, and table headers
  - Correct display of employee data
  - Display of "No data available" message when the employee list is empty

## Build

To create a production build:

npm run build

## Technologies Used

- React
- Redux for state management
- React Router for navigation
- React-modal for modal dialogs
- React-datepicker for date inputs
- Jest and React Testing Library for testing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


