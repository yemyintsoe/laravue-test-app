<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'role' => 'User'
        ]);
        Role::create([
            'role' => 'Editor'
        ]);
        Role::create([
            'role' => 'Admin',
            'permissions' => json_encode([
                [
                    "menu" => "Dashboard",
                    "read" =>  true,
                    "write" =>  true,
                    "update" =>  true,
                    "delete" => true,
                    "name" => "dashboard"
                ],
                [
                    "menu" => 'Tag',
                    "read" => false,
                    "write" => false,
                    "update" => false,
                    "delete" => false,
                    "name" => 'tags'
                ],
                [
                    "menu" => 'Category',
                    "read" => false,
                    "write" => false,
                    "update" => false,
                    "delete" => false,
                    "name" => 'categories'
                ],
                [
                    "menu" => 'User',
                    "read" => true,
                    "write" => true,
                    "update" => true,
                    "delete" => true,
                    "name" => 'users'
                ],
                [
                    "menu" => 'Role',
                    "read" => true,
                    "write" => true,
                    "update" => true,
                    "delete" => true,
                    "name" => 'roles'
                ]
            ])
        ]);
    }
}
