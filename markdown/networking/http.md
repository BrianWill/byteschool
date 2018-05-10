# HTTP (HyperText Transfer Protocol)

***HTTP*** is a request-response protocol used over TCP: 

 1. a client establishes a TCP connection with a server
 2. the client sends an HTTP request to the server
 3. the server sends back an HTTP response
 4. both sides close the connection

Though used primarily by web browsers and web servers, HTTP is also used by other kinds of clients and servers.

`HTTP/1.1` was the latest version for many years, but the newer `HTTP/2` was introduced in 2015 to improve performance and security. Though `HTTP/1.1` still predominates, `HTTP/2` is being adopted fairly quickly. (Everything described below applies to both `HTTP/1.1` and `HTTP/2`.)

## GET requests vs. POST requests

There are several kinds of requests, but only two are used in the vast majority of cases:

 - A ***GET*** request specifies a ***path*** (a string) denoting what it wants back in the response from the server. The meaning of the path is ultimately up to the server's interpretation.
 - A ***POST*** request is like a GET but also includes additional data sent to the server.
 
So we use GET when we just want something from the server, but we use POST when we want to send data to the server.

## request and response format

HTTP requests and responses are written starting with a header, which in some cases is followed by a message body:

 - the header is written as ASCII text
 - the first line of the header is the ***status line***, denoting the type of request or response
 - each additional line of the header is a field, starting with the field name, followed by a colon, a space, and lastly the value of the field
 - the header ends with a blank line
 - the encoding of the message body (if any) is specified by a field of the header

Here's an example GET response:

```
HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Length: 1994
Content-Type: text/html; charset=utf-8
Last-Modified: Fri, 21 Apr 2017 08:10:52 GMT
Date: Mon, 01 May 2017 22:32:43 GMT

<!DOCTYPE html>
<html>
Hello, world!
</html>
```

The first line (the status line) says this is a successful HTTP response; the next five lines are fields describing the response; the blank line denotes the end of the header; the message body (in this case an HTML document) is everything after the blank line.

[The complete list of request and response header fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields).

## HTTP requests

A GET request has no message body. The status line starts with `GET`, specifies the path, and then specifies the version of the protocol:

```
GET /thing/example.html HTTP/1.1
```

Of the few dozen request fields, only `Host` is required (in HTTP 1.1 and 2.0) in a GET. The `Host` field denotes the domain name and TCP port of the server to which the request is sent. (Without the `Host` field, a request could not be correctly routed when multiple web servers share the same IP address.)

A POST request includes a message body. The size of the message body (in bytes) is specified by a `Content-Length` field. `The encoding of the body is specified by a `Content-Type` field. 

Web browsers submit POST requests primarily using two content types:

 - `application/x-www-form-urlencoded` (the default)
 - `multipart/form-data` (better suited for binary data)

## HTTP responses

A response status line starts with the version of HTTP and then has a ***status code***, a three-digit number indicating the nature of the response:

 - status codes in the 200's indicate the request was successful
 - status codes in the 300's indicate redirection: the requested resource is found at a different host and/or path
 - status codes in the 400's indicate client error: the server cannot (or will not) successfully fulfill the client's request because of a mistake on the client's part
 - status codes in the 500's indicate server error: the server cannot (or will not) successfully fulfill the client's request because of a mistake or bug in the server

The text following the status code is simply a textual message meant for human readers.

Read about the other headers [here](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields).

## percent encoding (*a.k.a.* URL encoding)

HTTP expects URL paths to be ASCII-only. We represent non-ASCII bytes of our path using `%` followed by two hexadecimal digits, *e.g.* `%3B` is the byte `0011_1011`.

Some normal ASCII characters must also be 'percent encoded', such as `!`, `+`, `/`, `space`, and `%` itself. For example, the hex number of `%` in ASCII is 0x25, so `%` is percent encoded as `%25`. 

A `space` is percent encoded as `%20` but can also be represented by `+`. (This is why `+` itself must be percent encoded, as `%2B`.)

## query string

If a URL path contains a `?`, everything after is considered the ***query string*** of the URL. A query string is made up of zero or more name-value pairs: each name is separated from its value by `=`, and the name-value pairs are separated by `&`'s. For example:

```
/foo/bar?apple=banana&id=234123
```

This path has a query string with two name value pairs: `apple` with the value `banana`, and `id` with the value `234123`.

Any `?`, `=`, or `&` not intended to delineate a query string must be percent encoded.

The meaning of a query string is entirely up the interpretation of the server receiving the request. They are simply a way to encode information in paths.