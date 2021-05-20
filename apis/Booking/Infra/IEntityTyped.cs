namespace BookingAPI.Infra
{
    public interface IEntityTyped<TId> : IEntityBase
    {
        TId Id { get; }
    }
}