namespace BookingAPI.Infra
{
    public abstract class EntityTyped<TId> : IEntityTyped<TId>
    {
        public virtual TId Id { get; set; }
    }
}