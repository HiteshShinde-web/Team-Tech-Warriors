<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo $title;?> | Coaching Guru</title>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<!-- Bootstrap core CSS -->
<link href="<?php echo web_root; ?>css/bootstrap.min.css" rel="stylesheet">
<link href="<?php echo web_root; ?>css/dataTables.bootstrap.css" rel="stylesheet">  
<link href="<?php echo web_root; ?>fonts/font-awesome.min.css" rel="stylesheet">  
<link href="<?php echo web_root; ?>css/jquery-ui.css" rel="stylesheet">  

<style>
body {
    font-family: 'Poppins', sans-serif;
    background: #f4f7f6;
    margin: 0;
    padding: 0;
    color: #333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.navbar {
    background: #007bff;
    padding: 1rem;
    color: #fff;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.navbar img {
    height: 50px;
    width: auto;
    padding-right: 10px;
}
.navbar a {
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    margin: 0 15px;
}
.navbar a:hover {
    text-decoration: underline;
}
.sidenav {
    height: 100%;
    width: 250px;
    position: fixed;
    background: #007bff;
    padding-top: 80px;
    transition: width 0.5s;
    overflow-y: auto;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    top: 0;
}
.sidenav a {
    padding: 15px 20px;
    text-decoration: none;
    color: #fff;
    display: block;
    transition: background 0.3s, padding 0.3s;
    word-break: break-word;
}
.sidenav a:hover {
    background: #0056b3;
    padding-left: 30px;
}
.content {
    margin-left: 250px;
    padding: 100px 20px 20px;
    flex: 1;
    overflow-y: auto;
    max-height: calc(100vh - 120px);
    transition: margin-left 0.5s;
    word-wrap: break-word;
}
.footer {
    text-align: center;
    padding: 20px;
    background: #007bff;
    color: #fff;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
    margin-top: auto;
    position: relative;
    width: 100%;
    bottom: 0;
}
.card {
    background: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    word-wrap: break-word;
}
.card:hover {
    transform: scale(1.03);
}
</style>
</head>
<body>
<div class="navbar">
    <img src="<?php echo web_root; ?>images/logo.png" alt="Coaching Guru Logo">
    Coaching Guru 
</div>
<div class="sidenav">
    <a href="<?php echo web_root; ?>index.php?q=lesson">Lesson</a>
    <a href="<?php echo web_root; ?>index.php?q=exercises">Exercises</a>
    <a href="<?php echo web_root; ?>index.php?q=download">Download</a>
    <a href="<?php echo web_root; ?>index.php?q=about">About Us</a>
    <a href="logout.php">Logout</a>
</div>
<div class="content">
    <?php check_message(); ?>
    <div class="card">
        <?php require_once $content; ?>
    </div>
</div>
<div class="footer">
    &copy; <?php echo date('Y'); ?> Coaching Guru
</div>

<script src="<?php echo web_root; ?>jquery/jquery.min.js"></script>
<script src="<?php echo web_root; ?>js/bootstrap.min.js"></script>
</body>
</html>
