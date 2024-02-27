# post_crud_app

Use docker to run postgres instance
docker run --name postgres_container -e POSTGRES_USER=db_user -e POSTGRES_PASSWORD=db_password -e POSTGRES_DB=post -p 5432:5432 -d postgres
