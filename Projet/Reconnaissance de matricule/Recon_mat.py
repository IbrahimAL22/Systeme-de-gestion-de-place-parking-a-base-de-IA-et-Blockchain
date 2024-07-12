import json
from web3 import Web3
import time

import cv2
import numpy as np
import easyocr

web3 = Web3(Web3.HTTPProvider('http://192.168.100.152/'))
print(web3.isConnected())

abi = json.loads('[     {       "inputs": [],       "stateMutability": "nonpayable",       "type": "constructor"     },     {       "inputs": [],       "name": "Admin",       "outputs": [         {           "internalType": "address",           "name": "",           "type": "address"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [         {           "internalType": "address",           "name": "_id",           "type": "address"         },         {           "internalType": "string",           "name": "_name",           "type": "string"         },         {           "internalType": "uint32",           "name": "_phonenumber",           "type": "uint32"         },         {           "internalType": "string",           "name": "_gouvernorat",           "type": "string"         }       ],       "name": "signupProprietaire",       "outputs": [],       "stateMutability": "nonpayable",       "type": "function"     },     {       "inputs": [         {           "internalType": "address",           "name": "_id",           "type": "address"         },         {           "internalType": "string",           "name": "_name",           "type": "string"         },         {           "internalType": "uint32",           "name": "_phonenumber",           "type": "uint32"         },         {           "internalType": "string",           "name": "_gouvernorat",           "type": "string"         }       ],       "name": "signupLocataire",       "outputs": [],       "stateMutability": "nonpayable",       "type": "function"     },     {       "inputs": [         {           "internalType": "address",           "name": "_id",           "type": "address"         },         {           "internalType": "string",           "name": "_statut",           "type": "string"         }       ],       "name": "ProprietaireManage",       "outputs": [],       "stateMutability": "nonpayable",       "type": "function"     },     {       "inputs": [         {           "internalType": "address",           "name": "_id",           "type": "address"         },         {           "internalType": "string",           "name": "_statut",           "type": "string"         }       ],       "name": "LocataireManage",       "outputs": [],       "stateMutability": "nonpayable",       "type": "function"     },     {       "inputs": [],       "name": "isAdminExist",       "outputs": [         {           "internalType": "string",           "name": "",           "type": "string"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [],       "name": "isProprietaireExist",       "outputs": [         {           "internalType": "string",           "name": "",           "type": "string"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [],       "name": "isLocataireExist",       "outputs": [         {           "internalType": "string",           "name": "",           "type": "string"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [],       "name": "AdministrateurName",       "outputs": [         {           "internalType": "string",           "name": "",           "type": "string"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [],       "name": "ProprietaireName",       "outputs": [         {           "internalType": "string",           "name": "",           "type": "string"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [],       "name": "LocataireName",       "outputs": [         {           "internalType": "string",           "name": "",           "type": "string"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [         {           "internalType": "string",           "name": "_longitude",           "type": "string"         },         {           "internalType": "string",           "name": "_latitude",           "type": "string"         },         {           "internalType": "string",           "name": "_duree_dispo",           "type": "string"         },         {           "internalType": "string",           "name": "_date_debut",           "type": "string"         }       ],       "name": "setOffre",       "outputs": [],       "stateMutability": "nonpayable",       "type": "function"     },     {       "inputs": [         {           "internalType": "string",           "name": "_matricule",           "type": "string"         }       ],       "name": "setMatricule",       "outputs": [],       "stateMutability": "nonpayable",       "type": "function"     },     {       "inputs": [],       "name": "getOffre",       "outputs": [         {           "internalType": "uint32[]",           "name": "",           "type": "uint32[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [         {           "internalType": "uint32",           "name": "_number",           "type": "uint32"         },         {           "internalType": "string",           "name": "_etat",           "type": "string"         }       ],       "name": "setEtat",       "outputs": [],       "stateMutability": "nonpayable",       "type": "function"     },     {       "inputs": [         {           "internalType": "uint32",           "name": "_number",           "type": "uint32"         }       ],       "name": "setReservation",       "outputs": [],       "stateMutability": "nonpayable",       "type": "function"     },     {       "inputs": [],       "name": "getReservedOffre",       "outputs": [         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [],       "name": "Locataireliste",       "outputs": [         {           "internalType": "address[]",           "name": "",           "type": "address[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "uint32[]",           "name": "",           "type": "uint32[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     },     {       "inputs": [],       "name": "Proprietaireliste",       "outputs": [         {           "internalType": "address[]",           "name": "",           "type": "address[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "uint32[]",           "name": "",           "type": "uint32[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         },         {           "internalType": "string[]",           "name": "",           "type": "string[]"         }       ],       "stateMutability": "view",       "type": "function",       "constant": true     }   ]')
address = '0x0EA93e8210067De70fec809730DB611c3DA2a6d2'

contract = web3.eth.contract(address=address, abi=abi)

net = cv2.dnn.readNet('yolov3.weights', 'yolov3.cfg')

classes = ['license']

font = cv2.FONT_HERSHEY_PLAIN
colors = np.random.uniform(0, 255, size=(100, 3))
image='Cars130.png'
#while True:
img = cv2.imread(image)
height, width, _ = img.shape

blob = cv2.dnn.blobFromImage(img, 1/255, (416, 416), (0,0,0), swapRB=True, crop=False)
net.setInput(blob)
output_layers_names = net.getUnconnectedOutLayersNames()

print(len(output_layers_names))
print(output_layers_names)

layerOutputs = net.forward(output_layers_names)

boxes = []
confidences = []
class_ids = []

for output in layerOutputs:
    for detection in output:
        scores = detection[5:]
        class_id = np.argmax(scores)
        confidence = scores[class_id]
        if confidence > 0.5:
            center_x = int(detection[0]*width)
            center_y = int(detection[1]*height)
            w = int(detection[2]*width)
            h = int(detection[3]*height)

            x = int(center_x - w/2)
            y = int(center_y - h/2)

            boxes.append([x, y, w, h])
            confidences.append((float(confidence)))
            class_ids.append(class_id)

indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.2, 0.4)

if len(indexes)>0:
    for i in indexes.flatten():
        x, y, w, h = boxes[i]
        label = str(classes[class_ids[i]])
        confidence = str(round(confidences[i],2))
        color = colors[i]
        cv2.rectangle(img, (x,y), (x+w, y+h), color, 2)
        #cv2.putText(img, label + " " + confidence, (x, y+20), font, 1, (255,255,255), 2)
crop_img = img[y:y+h, x:x+w]
cv2.imwrite("Cropped.jpg", crop_img)
reader = easyocr.Reader(['en'])
result = reader.readtext(crop_img)
text = result[0][-2]
print(text)
while True:

    tab = contract.functions.getReservedOffre().call(
        {'from': '0x1Bc0dCEf7831d75B6b384104049e1038054c5AA7'})

    for i in range(len(tab[0])):
        n = tab[0][i]
        matricule = tab[5][i]
        if(matricule == text):
            contract.functions.setEtat(n, "valide").transact(
                {'from': '0x1Bc0dCEf7831d75B6b384104049e1038054c5AA7'})
            print(tab[0], " : ", "Matricule vérifié et validé")
        else:
            contract.functions.setEtat(n, "non valide").transact(
                {'from': '0x1Bc0dCEf7831d75B6b384104049e1038054c5AA7'})
            print(tab[0], " : ", "Matricule tapé non compatibe avec celle de voiture")

    time.sleep(10000)


    #cv2.imshow('Image', img)
    #key = cv2.waitKey(1)
    #if key==27:
    #    break

#cap.release()
#cv2.destroyAllWindows()