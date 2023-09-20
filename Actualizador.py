import subprocess, os
from tkinter import *
from tkinter.ttk import *


def actualizarApp():
    ruta_actual = os.getcwd()

    # Comando git pull
    comando = ['git', 'pull']

    try:
        # Ejecutar el comando git pull
        resultado = subprocess.run(comando, cwd=ruta_actual, capture_output=True, text=True, check=True)

        # Imprimir la salida estándar (stdout)
        print("Salida estándar:")
        print(resultado.stdout)

        # Imprimir la salida de error (stderr)
        print("Salida de error:")
        print(resultado.stderr)
    except subprocess.CalledProcessError as e:
        # Manejar errores si el comando falla
        print("Error al ejecutar git pull:", e)
    except Exception as e:
        # Manejar otras excepciones
        print("Ocurrió una excepción:", e)


 
# creates a Tk() object
master = Tk()
master.title('Buscador de actualizaciones')

# Gets screen dimensions
ancho_pantalla = master.winfo_screenwidth()
alto_pantalla = master.winfo_screenheight()

# Calcular el centro de la pantalla
x = (ancho_pantalla - master.winfo_reqwidth()) / 2
y = (alto_pantalla - master.winfo_reqheight()) / 2

# Configure window's position to the center
master.geometry("+%d+%d" % (x, y))
 
# sets the geometry of main
# root window
master.geometry("400x300")
 
 
label = Label(master,
              text ="Actualizador de App")
 
label.pack(pady = 10)
 
# a button widget which will open a
# new window on button click
btn = Button(master, text ="Actualizar", width=40, command = actualizarApp)
btn.pack(pady=10)
 
# mainloop, runs infinitely
mainloop()