How to login with curl
Request
```bash
curl -v http://localhost:3000/users/login \
-d '{"username": "john", "password": "changeme"}' \
-H "Content-Type: application/json"
```

```bash
curl -v http://localhost:3000/users/login \
-d '{"username": "chris", "password": "secret"}' \
-H "Content-Type: application/json"
```
Response
```
*   Trying ::1:3000...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> POST /users/login HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.65.3
> Accept: */*
> Content-Type: application/json
> Content-Length: 44
> 
* upload completely sent off: 44 out of 44 bytes
* Mark bundle as not supporting multiuse
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 26
< ETag: W/"1a-4MaKkIujB42hRbac2qIxwTRDQAk"
< Set-Cookie: connect.sid=s%3AYmrNiP5NYjkFFQOmkjojuzhIa27-58Ac.YEfC3MaJCV0llLp90rCNy%2F0sDesRyOAvPWw5qCbcHw8; Path=/; HttpOnly
< Date: Fri, 30 Aug 2019 07:42:36 GMT
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
{"id":1,"username":"john"}%   
```
How to call secure route
Copy `connect.sid=s%3AYmrNiP5NYjkFFQOmkjojuzhIa27-58Ac.YEfC3MaJCV0llLp90rCNy%2F0sDesRyOAvPWw5qCbcHw8` and set Cookie header

Request
```bash
curl -v http://localhost:3000/users/profile \
-H "Cookie: connect.sid=s%3A9VYsj1J6RX31XDZtSQeBSQgBc6Cq462g.HGjN9hQG4Lzr2Ad4LIPSjTjih%2B78i5sYw%2B%2BhHV%2BYSUI"
```
Response ( return current user from session )

```
*   Trying ::1:3000...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> GET /users/profile HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.65.3
> Accept: */*
> Cookie: connect.sid=s%3A9VYsj1J6RX31XDZtSQeBSQgBc6Cq462g.HGjN9hQG4Lzr2Ad4LIPSjTjih%2B78i5sYw%2B%2BhHV%2BYSUI
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 26
< ETag: W/"1a-4MaKkIujB42hRbac2qIxwTRDQAk"
< Date: Fri, 30 Aug 2019 07:44:27 GMT
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
{"id":1,"username":"john"}%     
```

How to call role-protected route
```bash
curl -v http://localhost:3000/cats \
-d '{"name": "Matroskin", "age": 1, "breed": "cheshire"}' -H "Content-Type: application/json" \
-H "Cookie: connect.sid=s%3ALwESBMCR1nqiDkxZw5J0wgikDXj9_jNf.3x44x8A%2FtHAkCqZsPZ7PPrdyujmRmW%2FRl%2BNkdsS%2BJnY"
```

```bash
*   Trying ::1:3000...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> POST /cats HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.65.3
> Accept: */*
> Content-Type: application/json
> Cookie: connect.sid=s%3Ac0RMxIpgrbLDu8dwnyQmaXqWmOhxQIT7.yKhvAJut30TrFRw54TvLOPNTPil3Nog8ifooTt%2FDEzk
> Content-Length: 52
> 
* upload completely sent off: 52 out of 52 bytes
* Mark bundle as not supporting multiuse
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 54
< ETag: W/"36-GKa6paVYiNcuJqxFfrkAFELyG3c"
< Date: Fri, 30 Aug 2019 08:43:12 GMT
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
{"id":1,"name":"Matroskin","age":1,"breed":"cheshire"}%     
```
