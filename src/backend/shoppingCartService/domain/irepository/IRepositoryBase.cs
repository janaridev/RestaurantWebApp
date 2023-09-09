using System.Linq.Expressions;

namespace domain.irepository;

public interface IRepositoryBase<T>
{
    IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges);
    void Create(T entity);
    void Delete(T entity);
}