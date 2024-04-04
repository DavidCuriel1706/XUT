import pandas as pd
import requests
from pyod.models.iforest import IForest
from sklearn.model_selection import GridSearchCV
import time
import hashlib
#Importa la funcion de un archivo externo
from Notificacion import AlertaEmail, AlertaTelegram

# Función para obtener los datos de la API REST de ntop
def get_data_from_api(url):
    response = requests.get(url)
    return response.json()

# URL de la API REST de ntop
url = "http://localhost:3100/flows"

# URL de la API de VirusTotal
vt_url = "https://www.virustotal.com/vtapi/v2/file/report"
vt_api_key = "TU_API_KEY_DE_VIRUSTOTAL"  # Reemplaza esto con tu propia API key de VirusTotal

# Bucle infinito para la detección de anomalías
while True:
    # Obtener los datos de la API REST de ntop
    data = get_data_from_api(url)

    # Convertir los datos en un DataFrame
    df = pd.DataFrame(data)

    # Preprocesamiento de datos y selección de atributos
    nombres_atrs = list(df.columns)
    nombres_atrs.remove('ts')
    X = df[nombres_atrs].values

    # Standardizar los datos
    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler()
    scaler.fit(X)
    X = scaler.transform(X)

    # Entrenar el modelo de Isolation Forest
    parameters = {'n_estimators': range(81, 120, 2), 'bootstrap': [True, False], 'contamination': [0.01]}
    clf = GridSearchCV(IForest(), parameters, cv=10, scoring='f1_micro')
    clf.fit(X)

    # Realizar predicciones con el modelo entrenado
    preds = clf.predict(X)

    # Analizar las predicciones
    anomalies = df[preds == -1]
    if not anomalies.empty:
        # Encontradas anomalías, analizar con VirusTotal
        for index, row in anomalies.iterrows():
            # Calcular el hash SHA-256 de los datos
            data_bytes = str(row.values).encode('utf-8')
            data_hash = hashlib.sha256(data_bytes).hexdigest()

            # Enviar solicitud a la API de VirusTotal
            params = {'apikey': vt_api_key, 'resource': data_hash}
            response = requests.get(vt_url, params=params)
            json_response = response.json()

            # Analizar la respuesta de VirusTotal
            if json_response['response_code'] == 1:
                print(f"Datos sospechosos detectados: {row.values}")
                print(f"Análisis de VirusTotal: {json_response['verbose_msg']}")
                # Enviar notificación por correo electrónico
                AlertaEmail(f"Datos sospechosos detectados: {row.values}", f"Análisis de VirusTotal: {json_response['verbose_msg']}")
                # Enviar notificación por Telegram
                AlertaTelegram(f"Datos sospechosos detectados: {row.values}\nAnálisis de VirusTotal: {json_response['verbose_msg']}")
            else:
                print(f"Error al analizar con VirusTotal: {json_response['verbose_msg']}")

    # Esperar 5 minutos antes de la siguiente iteración
    time.sleep(300)