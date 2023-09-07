using System.Linq.Expressions;
using domain.irepository;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
{
    protected RepositoryContext _repositoryContext;

    public RepositoryBase(RepositoryContext repositoryContext) => _repositoryContext = repositoryContext;

    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges) =>
        !trackChanges ?
            _repositoryContext.Set<T>()
                .Where(expression)
                .AsNoTracking() :
            _repositoryContext.Set<T>()
                .Where(expression);

    public void Create(T entity) => _repositoryContext.Set<T>().Add(entity);

    public void Delete(T entity)
    {
        throw new NotImplementedException();
    }


    public void Update(T entity)
    {
        throw new NotImplementedException();
    }
}