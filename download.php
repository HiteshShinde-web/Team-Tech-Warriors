<h1><?php echo $title; ?></h1>
<div class="col-lg-12">
	<div class="table-responsive">
		<table id="example" class="table table-bordered">
			<thead>
				<tr>
					<th width="2%">#</th>
					<th>Chapter</th>
					<th>Title/Description</th>
					<th>Category</th>
					<th width="10%">Action</th>
				</tr>
			</thead>
			<tbody>
				<?php 
				$sql = "SELECT * FROM tbllesson";
				$mydb->setQuery($sql);
				$cur = $mydb->loadResultList();
				$cnt = 1; // Counter
				foreach ($cur as $result) {
					echo '<tr>';
					echo '<td>' . $cnt++ . '</td>';
					echo '<td>' . $result->LessonChapter . '</td>';
					echo '<td>' . $result->LessonTitle . '</td>';
					echo '<td>' . $result->Category . '</td>';
					echo '<td><a href="' . web_root . 'admin/modules/lesson/' . $result->FileLocation . '" class="btn btn-xs btn-info" download><i class="fa fa-download"></i> Download</a></td>';
					echo '</tr>';
				}
				?>
			</tbody>
		</table>
	</div>
</div>
