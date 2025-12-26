# titanic_model_app.py

import streamlit as st
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

st.set_page_config(page_title="Titanic Survival Predictor", layout="centered")

st.title("🚢 Titanic Survival Prediction App")

# Load data
@st.cache_data
def load_data():
    df = pd.read_csv("train.csv")
    return df

df = load_data()

# Preprocess data
def preprocess_data(df):
    df = df[["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked", "Survived"]]
    df["Age"].fillna(df["Age"].median(), inplace=True)
    df["Embarked"].fillna(df["Embarked"].mode()[0], inplace=True)

    le_sex = LabelEncoder()
    le_embarked = LabelEncoder()

    df["Sex"] = le_sex.fit_transform(df["Sex"])
    df["Embarked"] = le_embarked.fit_transform(df["Embarked"])

    return df, le_sex, le_embarked

df_processed, le_sex, le_embarked = preprocess_data(df)

# Split features and target
X = df_processed.drop("Survived", axis=1)
y = df_processed["Survived"]

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Sidebar input
st.sidebar.header("Enter Passenger Details:")

def user_input():
    pclass = st.sidebar.selectbox("Passenger Class (1 = 1st, 2 = 2nd, 3 = 3rd)", [1, 2, 3])
    sex = st.sidebar.selectbox("Sex", ["male", "female"])
    age = st.sidebar.slider("Age", 0, 80, 29)
    sibsp = st.sidebar.number_input("Number of Siblings/Spouses Aboard", 0, 8, 0)
    parch = st.sidebar.number_input("Number of Parents/Children Aboard", 0, 6, 0)
    fare = st.sidebar.slider("Fare", 0.0, 600.0, 32.0)
    embarked = st.sidebar.selectbox("Port of Embarkation", ["S", "C", "Q"])

    # Encode inputs
    sex_encoded = le_sex.transform([sex])[0]
    embarked_encoded = le_embarked.transform([embarked])[0]

    features = pd.DataFrame({
        'Pclass': [pclass],
        'Sex': [sex_encoded],
        'Age': [age],
        'SibSp': [sibsp],
        'Parch': [parch],
        'Fare': [fare],
        'Embarked': [embarked_encoded]
    })
    return features

input_df = user_input()

# Prediction
if st.button("Predict Survival"):
    prediction = model.predict(input_df)[0]
    survival_prob = model.predict_proba(input_df)[0][1]

    if prediction == 1:
        st.success(f"🎉 The passenger is likely to **SURVIVE** (Probability: {survival_prob:.2f})")
    else:
        st.error(f"💀 The passenger is likely **NOT to survive** (Probability: {survival_prob:.2f})")

# Show raw data
if st.checkbox("Show raw data"):
    st.write(df.head())
