from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
db_path = os.path.join(data_dir, 'notes.db')

def connect_db():
    return sqlite3.connect(db_path)

@app.route('/api/notes', methods=['GET'])
def get_notes():
    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM notes')
        notes = [{'id': row[0], 'title': row[1], 'content': row[2]} for row in cursor.fetchall()]
        return jsonify({'notes': notes})

@app.route('/api/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM notes WHERE id = ?', (note_id,))
        note = cursor.fetchone()

    if note:
        return jsonify({'id': note[0], 'title': note[1], 'content': note[2]})
    return jsonify({'error': 'Note not found'}), 404

@app.route('/api/notes', methods=['POST'])
def add_note():
    data = request.get_json()
    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('INSERT INTO notes (title, content) VALUES (?, ?)', (data['title'], data['content']))
        conn.commit()
        return jsonify({'message': 'Note added successfully'})

@app.route('/api/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    data = request.get_json()
    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('UPDATE notes SET title = ?, content = ? WHERE id = ?', (data['title'], data['content'], note_id))
        conn.commit()
        return jsonify({'message': 'Note updated successfully'})

@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM notes WHERE id = ?', (note_id,))
        conn.commit()
        return jsonify({'message': 'Note deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True, port=2203)