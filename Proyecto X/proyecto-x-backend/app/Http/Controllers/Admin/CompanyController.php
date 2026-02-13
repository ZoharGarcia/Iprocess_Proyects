<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Str;

class CompanyController extends Controller
{
    // 🔹 Crear empresa (solo super_admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'plan' => 'required|in:basic,pro,enterprise',
        ]);

        $company = Company::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']) . '-' . uniqid(),
            'plan' => $validated['plan'],
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Empresa creada correctamente.',
            'company' => $company
        ]);
    }

    // 🔹 Listar empresas
    public function index()
    {
        return response()->json(
            Company::paginate(10)
        );
    }
}
