export interface RespuestaProducto {
  Ok: boolean;
  pagina: number;
  results: number;
  result: Producto[];
}

export interface Producto {
  imgs?: string[];
  impuesto: number;
  _id?: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion?: string;
  estado: boolean;
  cantidad: number;
  created?: string;
  usuario?: string;
  modificador?: any;
  __v?: number;
}
  
  export interface Usuario {
    _id?: string;
    nombre?: string;
    email?: string;
    ciudad?: string;
    direccion?: string;
    avatar?: string;
    administrador?: boolean;
    password?: string;
    __v?: number;
  }