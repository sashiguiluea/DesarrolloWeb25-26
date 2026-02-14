from flask import Flask

# Creamos la instancia principal de Flask
app = Flask(__name__)

# ------------------------------------------------
# Ruta principal del sistema
# ------------------------------------------------
@app.route('/')
def inicio():
    return "Bienvenido al Módulo de Ventas TechnoMarket S.A. - Tienda de Artículos Electrónicos"


# ------------------------------------------------
# Ruta dinámica: Categorías
# ------------------------------------------------
@app.route('/categoria/<nombre_categoria>')
def categoria(nombre_categoria):
    return f"Categoría: {nombre_categoria} - Catálogo disponible en TechnoMarket S.A."


# ------------------------------------------------
# Ruta dinámica: Productos
# ------------------------------------------------
@app.route('/producto/<nombre_producto>')
def producto(nombre_producto):
    return f"Producto: {nombre_producto} - Disponible para venta en TechnoMarket S.A."


# ------------------------------------------------
# Ruta dinámica: Clientes
# ------------------------------------------------
@app.route('/cliente/<nombre_cliente>')
def cliente(nombre_cliente):
    return f"Cliente: {nombre_cliente} - Bienvenido a TechnoMarket S.A."


# ------------------------------------------------
# Ruta dinámica: Ventas (ID numérico)
# ------------------------------------------------
@app.route('/venta/<int:id_venta>')
def venta(id_venta):
    return f"Venta registrada con ID #{id_venta} - TechnoMarket S.A."

# ------------------------------------------------
# Ruta dinámica: Empleados
# ------------------------------------------------
@app.route('/empleado/<nombre_empleado>')
def empleado(nombre_empleado):
    return f"Empleado: {nombre_empleado} - Acceso al módulo de gestión TechnoMarket S.A."


# ------------------------------------------------
# Punto de entrada de la aplicación
# ------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True)
