from flask import Flask, render_template, redirect
#from flask_pymongo import PyMongo

app = Flask(__name__)

# # Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
# mongo = PyMongo(app)


@app.route("/")
def welcome():
    # mars_record = mongo.db.mars.find_one()
    # print(mars_record)
    return render_template("welcomepage.html")


@app.route("/charts")
def charts():
    return render_template("charts.html")


@app.route("/report")
def report():
    return render_template("report.html")


@app.route("/map/<year>")
def map(year=None):
    return render_template("map.html")


if __name__ == "__main__":
    app.run(port=7000)
