# ALBA-ASSISTANT: Application to improve Security and Sustainable-awareness in Smart Home

ALBA-Assistant is presented as a tool that addresses the representation of all devices in a smart home, the automatic acquisition of relevant information about smart devices from external repositories, and the generation of metrics and graphs that inform the user about the current state of the environment.


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

1. Run migrations:
  ```
 python manage.py migrate
 ```
2. Start the server:
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
