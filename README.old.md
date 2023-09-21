# todo
TODO List Application Spec:
## Frontend (React):
1. The application should have a clean and user-friendly interface, with a header, main content area, and a form for adding new TODO items.
2. Display a list of existing TODO items retrieved from the backend MongoDB database.
3. Each TODO item should display its title, description, and a status indicator (e.g., pending, completed).
4. Implement a checkbox next to each TODO item to mark it as completed or pending.
5. Provide a button to delete a TODO item when it's no longer needed.
6. Include a form with input fields for the user to add new TODO items. The form should have fields for title, description, and a status dropdown (pending or completed).
## Backend (Express and MongoDB):
1. Set up an Express server to handle incoming requests from the frontend.
2. Create a MongoDB database (e.g., todoapp) to store TODO items.
3. Create routes on the server for the following CRUD operations:
   - Retrieve all TODO items from the database.
   - Add a new TODO item to the database.
   - Update the status of a TODO item (mark as completed or pending).
   - Delete a TODO item from the database.
4. Implement the necessary API endpoints to handle these CRUD operations.
## Application Flow:
1. When the user opens the TODO list app, the frontend should fetch all existing TODO items from the backend and display them on the screen.
2. The user can mark a TODO item as completed by clicking the checkbox next to it.
3. Clicking the checkbox should trigger an API call to update the status of the TODO item in the database.
4. The user can delete a TODO item by clicking the delete button associated with that item.
5. Clicking the delete button should trigger an API call to remove the TODO item from the database.
6. The user can add a new TODO item by filling out the form and submitting it.
7. Submitting the form should trigger an API call to add the new TODO item to the database.
8. The newly added TODO item should then appear in the list of TODO items on the frontend.