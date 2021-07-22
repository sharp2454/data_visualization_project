import os
from flask import Flask, render_template, redirect, jsonify
#from flask_pymongo import PyMongo

app = Flask(__name__)

#################################################
# Database Setup
#################################################

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

local_con = "postgresql://postgres:Ryley2004+@localhost:5432/aviation_data"

connection_str = os.environ.get('DATABASE_URL', '') or local_con

engine = create_engine(connection_str)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Aviation = Base.classes.aviation_data


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

@app.route("/map")
def map2():
    return render_template("index.html")

@app.route("/mapcopy/<year>")
def mapcopy(year=None):
    return render_template("map copy.html", year=year)

@app.route("/map/<year>")
def map(year=None):
    print(f"year= {year}")
    return render_template("map.html", year=year)


@app.route("/api/report")
def aviation_report():
    session = Session(engine)

    results = session.query(Aviation.accident_number).all()
    
    aviation_data = [r._asdict() for r in results]

    session.close()
    return jsonify(aviation_data)

@app.route("/api/matt")
def aviation_matt():
    session = Session(engine)

    results = session.query(Aviation.accident_number, Aviation.event_date).all()
    
    aviation_data = [r._asdict() for r in results]

    session.close()
    return jsonify(aviation_data)


if __name__ == "__main__":
    app.run(port=7000)
