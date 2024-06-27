from flask import Flask, request, jsonify
import pandas as pd
from statsmodels.tsa.ar_model import AutoReg
import io
import pickle

app = Flask(__name__)

# Load the trained model from the .pkl file
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the file from the POST request
    file = request.files['file']
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    # Read the CSV file into a DataFrame
    df = pd.read_csv(io.StringIO(file.read().decode('utf-8')), delimiter='\t')
    df['created_at'] = pd.to_datetime(df['created_at'])
    df.set_index('created_at', inplace=True)
    
    # Ensure the DataFrame is compatible with the model
    df = df[['grand_total']]
    
    # Make prediction
    start = len(df)
    end = start + 30
    predictions = model.predict(start=start, end=end, dynamic=True)

    result = {
        'dates': df.index.append(predictions.index).strftime('%Y-%m-%d').tolist(),
        'actual': df['grand_total'].tolist() + [None] * len(predictions),
        'predicted': [None] * len(df) + predictions.tolist()
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
