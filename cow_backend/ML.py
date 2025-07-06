# 1️⃣ Train and save ML models for disease and prescription prediction

import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
data = pd.read_csv("Training.csv")

# Encode disease labels
disease_encoder = LabelEncoder()
y_disease = disease_encoder.fit_transform(data['Disease'])

# Encode prescription labels
prescription_encoder = LabelEncoder()
y_prescription = prescription_encoder.fit_transform(data['Prescription'])

# Feature sets for each model
X_disease = data.drop(columns=['Disease', 'Prescription'])
X_prescription = X_disease.copy()  # assuming same features for both

# Train Random Forest models
disease_model = RandomForestClassifier()
disease_model.fit(X_disease, y_disease)

prescription_model = RandomForestClassifier()
prescription_model.fit(X_prescription, y_prescription)

# Save models and encoders
joblib.dump(disease_model, 'cow_disease_model.pkl')
joblib.dump(disease_encoder, 'disease_label_encoder.pkl')

joblib.dump(prescription_model, 'prescription_model.pkl')
joblib.dump(prescription_encoder, 'prescription_label_encoder.pkl')
