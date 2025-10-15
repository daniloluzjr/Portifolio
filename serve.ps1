param(
  [int]$Port = 8000
)

Add-Type -AssemblyName System.Net

$prefix = "http://localhost:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Static server running at $prefix (Ctrl+C to stop)"

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.LocalPath
    if ([string]::IsNullOrEmpty($path) -or $path -eq "/") { $file = "index.html" }
    else { $file = $path.TrimStart('/') }

    $full = Join-Path $PSScriptRoot $file

    if (Test-Path $full) {
      $ext = [System.IO.Path]::GetExtension($full).ToLower()
      switch ($ext) {
        ".html" { $ctype = "text/html" }
        ".css"  { $ctype = "text/css" }
        ".js"   { $ctype = "application/javascript" }
        ".png"  { $ctype = "image/png" }
        ".jpg"  { $ctype = "image/jpeg" }
        ".jpeg" { $ctype = "image/jpeg" }
        ".svg"  { $ctype = "image/svg+xml" }
        default  { $ctype = "application/octet-stream" }
      }

      $bytes = [System.IO.File]::ReadAllBytes($full)
      $response.ContentType = $ctype
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
      $response.ContentType = "text/plain"
      $response.ContentLength64 = $msg.Length
      $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.Close()
  }
}
finally {
  $listener.Stop()
  $listener.Close()
}