# NexusPlay POC – Plateforme de Mini-jeux Multijoueurs

Prototype d’architecture cloud-native (Kubernetes + microservices Node.js) avec CI/CD, autoscaling, cache Redis, monitoring, test de charge, gestion sécurisée des secrets et pipeline complet.

---

## 🚀 Fonctionnalités Implémentées

* **Microservices Node.js** :

  * `user-service` : gestion utilisateurs, endpoint santé.
  * `game-service` : gestion des parties, compteur via Redis.
* **Orchestration Kubernetes (Minikube)** :

  * Déploiements, services (`NodePort` et `Ingress`).
  * Autoscaling automatique avec HPA.
  * Gestion sécurisée des secrets (Kubernetes Secrets).
  * Cache partagé Redis déployé dans le cluster.
* **CI/CD GitHub Actions** :

  * Build, tests, déploiement automatisé via runner auto-hébergé.
  * Test de charge automatisé via ApacheBench.
  * Notifications d’incidents prêtes à l’emploi (webhook Slack).
* **Monitoring** :

  * Visualisation des métriques des pods/services.
* **DNS Haute disponibilité** : CoreDNS (K8s).

---

## 🏗️ Architecture

![image](https://github.com/user-attachments/assets/067d022d-0c76-4c09-a259-9cd80c68187d)


---

## 📂 Organisation du dépôt

```
nexusplay-poc/
│
├── microservices/
│   ├── user-service/
│   └── game-service/
├── k8s/
│   ├── user-deployment.yaml
│   ├── game-deployment.yaml
│   ├── redis-deployment.yaml
│   ├── ingress.yaml
│   ├── hpa-user.yaml
│   ├── hpa-game.yaml
│   └── secrets.yaml
│
├── .github/workflows/
│   └── ci-cd.yml
│
├── monitoring/
│   └── (values.yaml, autres manifests si besoin)
│
└── README.md
```

---

## ⚙️ Déploiement local rapide

### 1. **Prérequis**

* Docker, Minikube, kubectl, Helm, Node.js

### 2. **Démarrage Minikube**

```bash
minikube start --memory=4096 --cpus=2
minikube addons enable ingress
minikube addons enable metrics-server
```

### 3. **Build images Docker dans Minikube**

```bash
eval $(minikube docker-env)
docker build -t user-service:latest ./microservices/user-service
docker build -t game-service:latest ./microservices/game-service
```

### 4. **Déploiement des manifests K8s**

```bash
kubectl apply -f k8s/
```

### 5. **Vérifier les services et accéder à l’API**

```bash
kubectl get svc
kubectl get ingress
minikube ip
```

Accès typique :

* `http://<minikube ip>:32122/user/status`
* `http://<minikube ip>:32123/game/play`
* ou via Ingress : `http://<minikube ip>/user/status`

---

## 🔁 Pipeline CI/CD (GitHub Actions)

* Build, test, build Docker, déploiement K8s et test de charge automatisés
* Runner auto-hébergé connecté à Minikube
* **Test de charge** via ApacheBench (`ab`)
* Notifications prêtes pour Slack (variable secrète à fournir)

---

## 📸 **Captures & Résultats**

### **1. CI/CD – Exécution des jobs et gestion des échecs/réussites**

# Lancement du notre runner self hosted

![image](https://github.com/user-attachments/assets/e075f722-2183-4a0c-8492-49979a0e8ef5)


![image](https://github.com/user-attachments/assets/b5907c0a-a208-4a24-ba06-45bd836694ae)


# Pipeline Successful

![image](https://github.com/user-attachments/assets/b4660ce2-7984-4de9-975e-b54eb50c9212)



---

### **2. Test de Charge – ApacheBench**

![image](https://github.com/user-attachments/assets/a6ff78ce-67af-4687-8dc0-7a23c5690258)


---

### **3. Monitoring (Grafana)**



![image](https://github.com/user-attachments/assets/3b031ffc-aaaa-49d6-b7f4-3eba3bf3a60c)


---

### **4. notification SLACK**


![image](https://github.com/user-attachments/assets/3da416bf-89d4-46a6-a033-5c1f6c09d0a6)


---



## ⚠️ Limitations & Points à améliorer

* **Ressources** : environnement local limité, certains outils de monitoring lourds difficilement utilisables en continu.
* **Notification incident** : webhook Slack non activé (pas de credentials de test fournis).
* **Tests unitaires** : non approfondis, placeholder dans la CI.
* **Pas de véritable cloud/HA multi-nœuds**, mais la logique K8s est réplicable sur cloud provider.
* **Monitoring allégé selon la charge** (Prometheus/Grafana).
* **CoreDNS** utilisé comme DNS K8s, mais pas de scénario “failover DNS” explicite (hors scope Minikube single-node).

---


