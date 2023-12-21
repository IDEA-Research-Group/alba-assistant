# ALBA-ASSISTANT: Application to improve Security and Sustainable-awareness in Smart Home





## Installation
1. Clone the repository:
 ```
git clone https://github.com/IDEA-Research-Group/alba-assistant.git
cd alba-assistant
 ```
2. Create a virtual environment for the backend:
 ```
python -m venv venv
 ```
3. Activate the virtual environment:

- On Windows:

  ```
  .\venv\Scripts\activate
  ```

- On macOS/Linux:

  ```
  source venv/bin/activate
  ```
#### Backend Setup

6. Run migrations:
  ```
 python manage.py migrate
 ```
7. Start the server:
  ```
 python manage.py runserver
 ```
The backend will be available at http://localhost:8000.

Rest-API: http://localhost:8000/vulnet/api/v1/

#### Frontend Setup

1. Navigate to the frontend directory:
  ```
  cd vulnet_frontend
  ```
2. Install frontend dependencies:
  ```
  npm install
  ```
3. Start the React application:
  ```
   npm start
  ```

The frontend will be available at  http://localhost:5173.


## License

This project is under the GNU General Public License (GPL) License.
