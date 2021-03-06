<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCamerasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cameras', function($table)
		{
			$table->increments('id');
			$table->string('ip_address', 15);
			$table->smallInteger('port')->default('8554');
			$table->unique(array('ip_address', 'port'));
			$table->string('protocol', 5)->default('HTTP');
			$table->string('name', 64)->nullable();
			
			$table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('cameras');
	}

}
