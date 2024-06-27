import Button from 'components/Button';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Anuncie.module.scss';
import { useForm } from 'react-hook-form';
import { cadastrarItem } from 'store/reducers/itens';
import { useParams } from 'react-router-dom';
import Input from 'components/Input';

export default function Anuncie() {
  const dispatch = useDispatch();
  const { nomeCategoria = '' } = useParams();
  const categorias = useSelector(state => state.categorias.map(({ nome, id }) => ({ nome, id })));
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: nomeCategoria
    }
  });

  const {errors} = formState;
  console.log(errors);

  function cadastrar(data) {
    dispatch(cadastrarItem(data));
  }
  return (
    <div className={styles.container}>
      <Header
        titulo='Anuncie aqui!'
        descricao='Anuncie seu produto no melhor site do Brasil!'
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
      <Input {...register('titulo', { required: 'O campo titulo é obrigatório' })} erro={errors.titulo} placeholder='Nome do produto' alt='nome do produto' />
      {errors.titulo && <span className={styles['mensagem-erro']}> {errors.titulo.message} </span>}
        <Input {...register('descricao', { required: 'O campo descricao é obrigatório' })} erro={errors.descricao} placeholder='Descrição do produto' alt='descrição do produto' />
        {errors.descricao && <span className={styles['mensagem-erro']}> {errors.descricao.message} </span>}
        <Input {...register('foto', { required: 'O campo foto é obrigatório' })} erro={errors.foto} placeholder='URL da imagem do produto' alt='URL da imagem do produto' />
        {errors.foto && <span className={styles['mensagem-erro']}> {errors.foto.message} </span>}
        <select
          {...register('categoria', { required: 'O campo categoria é obrigatório' })}
          disabled={nomeCategoria} className={errors.categoria ? styles['input-erro'] : ''}
        >
          <option value='' disabled > Selecione a categoria </option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {errors.categoria && <span className={styles['mensagem-erro']}> {errors.categoria.message} </span>}
        <Input {...register('preco', { required: 'O campo preço é obrigatório', valueAsNumber: true })} erro={errors.preco} type='number' placeholder='Preço do produto' />
        {errors.preco && <span className={styles['mensagem-erro']}> {errors.preco.message} </span>}
        <Button type='submit'>
          Cadastrar produto
        </Button>
      </form>
    </div>
  )
}