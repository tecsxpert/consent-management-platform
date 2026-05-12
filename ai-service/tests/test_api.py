import pytest
from app import app


@pytest.fixture
def client():
    app.testing = True
    return app.test_client()


# 1. Health endpoint
def test_health(client):

    response = client.get("/health")

    assert response.status_code == 200


# 2. Describe missing text
def test_describe_missing_text(client):

    response = client.post("/describe", json={})

    assert response.status_code == 400


# 3. Describe short input
def test_describe_short_input(client):

    response = client.post("/describe", json={
        "text": "short"
    })

    assert response.status_code == 400


# 4. Recommend missing text
def test_recommend_missing_text(client):

    response = client.post("/recommend", json={})

    assert response.status_code == 400


# 5. Recommend short input
def test_recommend_short_input(client):

    response = client.post("/recommend", json={
        "text": "abc"
    })

    assert response.status_code == 400


# 6. Analyse missing text
def test_analyse_missing_text(client):

    response = client.post("/analyse-document", json={})

    assert response.status_code == 400


# 7. Analyse short input
def test_analyse_short_input(client):

    response = client.post("/analyse-document", json={
        "text": "small"
    })

    assert response.status_code == 400


# 8. Report missing text
def test_report_missing_text(client):

    response = client.post("/generate-report", json={})

    assert response.status_code == 400


# 9. Report short input
def test_report_short_input(client):

    response = client.post("/generate-report", json={
        "text": "tiny"
    })

    assert response.status_code == 400


# 10. Invalid endpoint
def test_invalid_endpoint(client):

    response = client.get("/invalid-route")

    assert response.status_code == 404

def test_batch_missing_items(client):

    response = client.post("/batch-process", json={})

    assert response.status_code == 400
