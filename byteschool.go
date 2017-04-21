package main

import (
    "fmt"
    "net/http"
    "log"
    "os"
    "io/ioutil"
    "path"
    "path/filepath"

    "github.com/russross/blackfriday"
)

const markdownInput = "markdown"
const markdownOutput = "static/content"


var header = []byte(`
    <!DOCTYPE html>
    <html>
    <head>
    <link rel="stylesheet" href="/static/highlight/styles/default.css">
    <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro|Source+Sans+Pro" rel="stylesheet"> 
    <script src="/static/highlight/highlight.pack.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <style>
    body {
        font-family: 'Source Sans Pro', sans-serif;
    }
    h1, h2, h3, h4, h5, h6 {
        color: rgb(193, 28, 28);
        width: 700px;
    }
    h1 {
        font-size: 40px;
    }
    p, ol, ul {
        width: 700px;
    }
    em {
        padding-right: 2px;
    }
    pre code {
        font-family: 'Source Code Pro', sans-serif;
        font-size: inherit;
        word-spacing: 0pt;
        font-weight: inherit;
        font-size: 90%;
    }
    .hljs-keyword {
        color: #222296;
    }
    code {
        font-family: 'Source Code Pro', sans-serif;
        font-size: 80%;
        color: #477d79;
        font-weight: bold;
        word-spacing: -1pt;
    }
    </style>
    <title>`)

var headerCloser = []byte(`</title>
    </head>
    <body>`)

var footer = []byte(`
    <body>
    </html>`)


func generateHTML() error {
    err := os.RemoveAll(markdownOutput)
    if err != nil {
        return err
    }

    generateWalk := func (path_ string, info os.FileInfo, err error) error {
        if err != nil {
            return err
        }
        newPath := path.Join(markdownOutput, path_[len(markdownInput):])
        fmt.Println("path:", newPath)
        if info.IsDir() {
            err := os.MkdirAll(newPath, os.ModePerm)
            if err != nil {
                return err
            }
        } else {
            bytes, err := ioutil.ReadFile(path_)
            if err != nil {
                return err
            }
            output := blackfriday.MarkdownCommon(bytes)
            name := info.Name()
            baseName := name[:len(name) - 3]   // drop ".md"
            data := append(header, []byte(baseName)...)
            data = append(data, headerCloser...)
            data = append(data, output...)
            data = append(data, footer...)
            err = ioutil.WriteFile(newPath[:len(newPath) - 3] + ".html", data, os.ModePerm)
            if err != nil {
                return err
            }
        }
        return nil
    }

    err = filepath.Walk(markdownInput, generateWalk)
    if err != nil {
        return err
    } 
    return nil
}

func handler(w http.ResponseWriter, r *http.Request) {
    path := r.URL.Path
    if path == "/" {
        http.ServeFile(w, r, "static/content/course.html")
    } else if path == "/favicon.ico" {
        http.ServeFile(w, r, "static/images/favicon.ico")
    } else {
        http.NotFound(w, r)
    }
}

func main() {
    err := generateHTML()
    if err != nil {
        fmt.Println("generation failed", err)
        return
    } 
    fmt.Println("generation successful")    

    http.HandleFunc("/", handler)
    http.Handle("/content/", http.StripPrefix("/content/", http.FileServer(http.Dir("static/content"))))
    http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

    fmt.Println("byteschool listening :3000...")
    err = http.ListenAndServe(":3000", nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}